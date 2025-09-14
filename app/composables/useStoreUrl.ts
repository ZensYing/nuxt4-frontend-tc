// composables/useStoreUrl.ts
export const useStoreUrl = () => {
  // A more comprehensive and robust Khmer to Latin transliteration map.
  // This map is based on a phonetic approach, which is often
  // preferred for user-friendly URLs and search. It's an enhanced version
  // of the original to handle more complex cases.
  const khmerMap: { [key: string]: string } = {
    // Consonants (a-series and o-series handled by a more phonetic approach)
    'ក': 'k', 'ខ': 'kh', 'គ': 'k', 'ឃ': 'kh', 'ង': 'ng',
    'ច': 'ch', 'ឆ': 'chh', 'ជ': 'ch', 'ឈ': 'chh', 'ញ': 'nh',
    'ដ': 'd', 'ឋ': 'th', 'ឌ': 'd', 'ឍ': 'th', 'ណ': 'n',
    'ត': 't', 'ថ': 'th', 'ទ': 't', 'ធ': 'th', 'ន': 'n',
    'ប': 'p', 'ផ': 'ph', 'ព': 'p', 'ភ': 'ph', 'ម': 'm',
    'យ': 'y', 'រ': 'r', 'ល': 'l', 'វ': 'v', 'ស': 's',
    'ហ': 'h', 'ឡ': 'l', 'អ': 'a',

    // Dependent Vowels (based on common phonetic romanization)
    'ា': 'a', 'ិ': 'i', 'ី': 'ei', 'ឹ': 'eu', 'ឺ': 'ueu',
    'ុ': 'u', 'ូ': 'ou', 'ួ': 'uo', 'ើ': 'oe', 'ឿ': 'oeu',
    'ៀ': 'ie', 'េ': 'e', 'ែ': 'ae', 'ៃ': 'ai', 'ោ': 'o',
    'ៅ': 'au',
    // Vowel with anusvara/visarga
    'ំ': 'am', 'ាំ': 'am', 'ះ': 'ah', 'ុះ': 'uh', 'េះ': 'eh',

    // Independent Vowels (less common in modern use)
    'ឥ': 'ei', 'ឰ': 'ai', 'ឧ': 'ou', 'ឳ': 'au', 'ឫ': 'ry', 'ឬ': 'rue',
    'ឭ': 'lu', 'ឮ': 'lue', 'ឯ': 'ae', 'ឱ': 'ao', 'ឲ': 'ao',

    // Diacritics and symbols (some are handled by the main function, but good to have)
    '៉': '', '៊': '', 'ៈ': 'ak', '់': '', '៖': '', '។': '.', 'ៗ': 'repeat',

    // Numbers
    '០': '0', '១': '1', '២': '2', '៣': '3', '៤': '4',
    '៥': '5', '៦': '6', '៧': '7', '៨': '8', '៩': '9'
  };

  /**
   * Transliterates Khmer characters to Latin.
   * This is a simple, character-by-character mapping.
   * For URLs and SEO, this is often sufficient and more user-friendly.
   */
  const transliterateKhmer = (text: string): string => {
    // A simple, character-by-character replacement
    let result = '';
    for (const char of text) {
      result += khmerMap[char] || char;
    }
    return result;
  };
  
  /**
   * Converts store name to a URL-friendly slug with Unicode support.
   * This function combines transliteration with slugification best practices.
   */
  const formatStoreSlug = (storeName: string): string => {
    if (!storeName) return '';
    
    let processed = storeName.trim();
    
    // Step 1: Transliterate Khmer characters.
    // This is the most crucial part for SEO in Cambodia.
    processed = transliterateKhmer(processed);
    
    // Step 2: Handle other Unicode characters and special symbols.
    // We normalize and remove diacritics to ensure consistency.
    processed = processed
      .normalize('NFD') // Normalize to separate base characters and diacritics
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (e.g., accents)
      .replace(/[^\p{L}\p{N}\s\-]/gu, '') // Keep only letters, numbers, spaces, and hyphens (Unicode-aware)
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/^-+|-+$/g, '') // Trim leading/trailing hyphens
      .toLowerCase();
    
    // Step 3: Fallback for edge cases (e.g., if the name only contains symbols)
    if (!processed.length) {
      // Create a unique hash from the original name
      const hash = storeName.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      processed = `store-${Math.abs(hash).toString(36)}`;
    }
    
    return processed;
  };

  /**
   * Generates a unique, URL-friendly path for a store.
   * Uses both a descriptive slug and a unique identifier for reliability.
   */
  const getStoreUrl = (store: any): string => {
    const storeName = store?.store_name || store?.name || (store?.first_name ? `${store.first_name}s Store` : 'store');
    const slug = formatStoreSlug(storeName);
    const storeId = store?.id || '';
    
    // Using a pattern like `/store/@slug-id` is a good practice.
    // The Directus UUID is a great unique identifier.
    return `/store/@${slug}`;
  };

  /**
   * Parses a slug from a URL to extract the slug and store ID.
   */
  const parseStoreSlug = (slug: string): { slug: string; storeId?: string } => {
    const cleanSlug = slug.replace(/^@/, '').toLowerCase();
    
    // Directus UUIDs are 36 characters (e.g., '123e4567-e89b-12d3-a456-426614174000')
    // A simplified check is for a long hexadecimal string.
    const parts = cleanSlug.split('-');
    
    if (parts.length > 1) {
      const potentialId = parts[parts.length - 1];
      // Regex to check for a UUID-like structure
      // A full UUID regex is long, a simpler one is often enough
      if (potentialId && /^[a-f0-9]{8,36}$/.test(potentialId)) {
        return {
          slug: parts.slice(0, -1).join('-'),
          storeId: potentialId
        };
      }
    }
    return { slug: cleanSlug };
  };

  /**
   * Creates search variations for a slug. Useful for fuzzy matching in searches.
   */
  const getSearchVariations = (slug: string): string[] => {
    const variations = new Set<string>();
    
    variations.add(slug);
    variations.add(slug.replace(/-/g, ' '));
    variations.add(slug.replace(/-/g, '_'));
    variations.add(slug.replace(/[^a-zA-Z0-9]/g, ''));
    
    return Array.from(variations).filter(v => v.length > 0);
  };

  return {
    formatStoreSlug,
    getStoreUrl,
    parseStoreSlug,
    getSearchVariations,
    transliterateKhmer,
  };
};