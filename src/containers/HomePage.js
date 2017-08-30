import { connect } from 'react-redux'

import Home from '../components/Home'
import { fetchSinglePage } from '../actions/page'
import { fetchPosts } from '../actions/post'
import { fetchMedia } from '../actions/media'
import { filteredMediaByCategory, getPageSection } from '../selectors'
import { HOME_CAROUSEL_CATEGORY_ID } from '../constants/site'

const mapStateToProps = (state, ownProps) => ({
  pageId: ownProps.pageId,
  site: state.site,
  posts: state.entities.posts,
  pageSection: getPageSection(state, ownProps.pageId),
  homeCarouselMedia: filteredMediaByCategory(state, HOME_CAROUSEL_CATEGORY_ID),
})

const mapDispatchToProps = dispatch => ({
  fetchSinglePage: id => {
    dispatch(fetchSinglePage(id))
  },
  fetchPosts: () => {
    dispatch(fetchPosts())
  },
  fetchMedia: options => {
    dispatch(fetchMedia(options))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
