export const useI18nConfig = () => {
  // Retrieve the saved locale from localStorage or default to 'en'
  const savedLocale = process.client ? localStorage.getItem('locale') || 'en' : 'en';

  // Function to set the font class on the <html> tag
  const setFontClass = (locale: string) => {
    if (process.client) {
      const html = document.documentElement;
      if (locale === 'km') {
        html.classList.add('kantumruy-pro');
        html.classList.remove('kantumruy-pro');
      } else {
        html.classList.add('kantumruy-pro');
        html.classList.remove('kantumruy-pro');
      }
    }
  };

  // Apply the font class on initialization
  if (process.client) {
    setFontClass(savedLocale);
  }

  return {
    strategy: 'prefix_and_default',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', iso: 'en-US' },
      { code: 'km', name: 'Khmer', iso: 'km-KH' },
    ],
    vueI18n: {
      legacy: false,
      globalInjection: true,
      silentTranslationWarn: true,
      locale: savedLocale, // Set the saved locale or fallback to 'en'
      fallbackLocale: 'en', // Fallback locale
      messages: {
        en: {
          signIn: 'Sign In',
          signOut: 'Sign Out',
          favorite: 'Favorite',
          remove_favorite: 'Remove Favorite',
          contactUs: 'Contact Us',
          deliveryInfo: 'Delivery Info',
          dashboard: 'Dashboard',
          home: 'Home',
          categories: 'Categories',
          search: 'Search for products',
          share: 'Share',
          name: 'Name',
          phone_number: 'Phone Number',
          detail_address: 'Detail Address',
          profile: 'Profile',
          project: 'Project',
          about: 'About',
          full_name: 'MORM Navasiri',
          hero_des: `New knowledge from Gen-Al, digital marketing + technology`,
          // English
          error: {
            notFound: '404 - Article Not Found',
            articleNotFound: 'The article you’re looking for doesn’t exist.',
            somethingWentWrong: 'Something went wrong. Please try again.',
          },
          common: {
            backToBlog: 'Back to Blog',
            views: 'views',
            unknownAuthor: 'Unknown Author',
            enterEmail: 'Enter your email',
            subscribe: 'Subscribe',
            linkCopied: 'Link copied to clipboard!',
          },
          blog: {
            popularArticles: 'Popular Articles',
            shareArticle: 'Share this article',
            noRelatedArticles: 'No related articles found.',
            youMightAlsoLike: 'You might also like',
            stayUpdated: 'Stay Updated',
            newsletterDescription: 'Subscribe to our newsletter to get the latest updates.',
            subscriptionSuccess: 'Thank you for subscribing!',
            relatedArticles: 'Related Articles',
          },

        },
        km: {
          signIn: 'ចូលគណនី',
          signOut: 'ចាកចេញ',
          favorite: 'ចូលចិត្ត',
          contactUs: 'ទាក់ទងយើង',
          home: 'ទំព័រដើម',
          categories: 'ប្រភេទ',
          search: 'ស្វែងរកផលិតផល',
          share: 'ចែករំលែក',
          name: 'ឈ្មោះ',
          phone_number: 'លេខទូរស័ព្ទ',
          cart_address: 'អាសយដ្ឋាន',
          detail_address: 'អាសយដ្ឋានលំអិត',
          payment_method: 'មធ្យោបាយបង់ប្រាក់',
          pay_arrived: 'អោយលុយពេលទំនិញទៅដល់',
          list_food: 'បញ្ជីទំនិញ',
          profile: 'ប្រវត្តិរូប',
          project: 'គម្រោង',
          about: 'អំពីយើង',
          full_name: 'សួន សុរដ្ឋា',
          hero_des: `ចំណេះដឹងថ្មីៗពី Gen-Al ទីផ្សារឌីជីថល+បច្ចេកវិទ្យា `,
          // Khmer
          error: {
            notFound: 'អត្ថបទមិនមាន',
            articleNotFound: 'សូមអភ័យទោស! អត្ថបទដែលអ្នកកំពុងស្វែងរកមិនមានទេ។',
            somethingWentWrong: 'មានបញ្ហាមួយ! សូមសាកល្បងម្តងទៀត។',
          },
          common: {
            backToBlog: 'ត្រលប់ទៅប្លុក',
            views: 'ការមើល',
            unknownAuthor: 'អ្នកនិពន្ធមិនស្គាល់',
            enterEmail: 'បញ្ចូលអ៊ីម៉ែលរបស់អ្នក',
            subscribe: 'ជាវព័ត៍មាន',
            linkCopied: 'បានចម្លងតំណរួចរាល់!',
          },
          blog: {
            popularArticles: 'អត្ថបទពេញនិយម',
            shareArticle: 'ចែករំលែកអត្ថបទនេះ',
            noRelatedArticles: 'មិនមានអត្ថបទទាក់ទងទេ។',
            youMightAlsoLike: 'អាចអ្នកចង់អានផងដែរ',
            stayUpdated: 'អានព័ត៌មានថ្មីៗ',
            newsletterDescription: 'ជាវព័ត៍មានដើម្បីទទួលបានអត្ថបទថ្មីៗ',
            subscriptionSuccess: 'អរគុណសម្រាប់ការជាវព័ត៍មាន!',
            relatedArticles: 'អត្ថបទទាក់ទង',
          },

        },
      },
    },
    setFontClass, // Export the function for use in other parts of the app
  };
};
