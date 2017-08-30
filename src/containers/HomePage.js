import { connect } from 'react-redux'

import Home from '../components/Home'
import { fetchPages } from '../actions/page'
import { fetchPosts } from '../actions/post'
import { fetchMedia } from '../actions/media'
import { filteredMediaByCategory, getPageContentByCatId } from '../selectors'
import { HOME_CAROUSEL_CATEGORY_ID, HOME_CONTENT_CATEGORY_ID } from '../constants/site'

const mapStateToProps = state => ({
  site: state.site,
  posts: state.entities.posts,
  content: getPageContentByCatId(state, HOME_CONTENT_CATEGORY_ID),
  homeCarouselMedia: filteredMediaByCategory(state, HOME_CAROUSEL_CATEGORY_ID),
})

const mapDispatchToProps = dispatch => ({
  fetchPages: options => {
    dispatch(fetchPages(options))
  },
  fetchPosts: () => {
    dispatch(fetchPosts())
  },
  fetchMedia: options => {
    dispatch(fetchMedia(options))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
