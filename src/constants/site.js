export const PRIMARY_MENU_ID = 2
export const HOME_CAROUSEL_CATEGORY_ID = 4
export const HOME_CONTENT_CATEGORY_ID = 5
export const DEFAULT_QUERY = {
  page: {
    fields: 'id,title,slug,categories,tilte.rendered,content.rendered,excerpt.rendered,better_featured_image.id,better_fetured_image.alt_text.better_featured_image.source_url',
  },
  post: {
    fields: 'id,date,slug,categories,title.rendered,content.rendered,excerpt.rendered,better_featured_image.id,better_fetured_image.alt_text.better_featured_image.source_url',
  },
  media: {
    fields: 'id,categories,alt_text,source_url',
  },
}
