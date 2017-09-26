export const HOME_CAROUSEL_CATEGORY_ID = 4
export const DEFAULT_QUERY = {
  page: {
    fields: 'id,slug,categories,acf,title.rendered,content.rendered,excerpt.rendered,better_featured_image.id,better_featured_image.alt_text,better_featured_image.source_url,wps_subtitle',
  },
  post: {
    fields: 'id,date,slug,categories,acf,title.rendered,content.rendered,excerpt.rendered,better_featured_image.id,better_featured_image.alt_text,better_featured_image.source_url,wps_subtitle',
  },
  media: {
    fields: 'id,categories,alt_text,source_url,acf',
  },
}
