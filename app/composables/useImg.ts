//  composables/useImg.ts
export const useImg = (img: string) => {
  const baseUrl = useRuntimeConfig().public.DIRECTUS_URL;
  return baseUrl + '/assets/' + img;
};
