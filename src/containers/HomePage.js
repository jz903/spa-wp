import { connect } from 'react-redux'

import Home from '../components/Home'
import { fetchPage } from '../actions/page'
import { fetchAllPosts } from '../actions/post'
import { fetchAllMedia } from '../actions/media'
import { getPageDetail, filteredMediaByCategory } from '../selectors'
import { HOME_CAROUSEL_CATEGORY_ID } from '../constants/site'

const mapStateToProps = (state, ownProps) => ({
  pageId: ownProps.pageId,
  page: getPageDetail(state, ownProps),
  posts: state.entities.posts,
  homeCarouselMedia: filteredMediaByCategory(state, HOME_CAROUSEL_CATEGORY_ID),
})

const mapDispatchToProps = dispatch => ({
  fetchPage: id => {
    dispatch(fetchPage(id))
  },
  fetchAllPosts: () => {
    dispatch(fetchAllPosts())
  },
  fetchAllMedia: options => {
    dispatch(fetchAllMedia(options))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
