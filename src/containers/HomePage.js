import { connect } from 'react-redux'

import Home from '../components/Home'
import { fetchSinglePage } from '../actions/page'
import { fetchPosts } from '../actions/post'
import { getPageDetail, getPageCarousel, getPageSection } from '../selectors'

const mapStateToProps = (state, ownProps) => ({
  pageId: ownProps.pageId,
  site: state.site,
  posts: state.entities.posts,
  page: getPageDetail(state, ownProps.pageId),
  pageSection: getPageSection(state, ownProps.pageId),
  homeCarousel: getPageCarousel(state, ownProps.pageId),
})

const mapDispatchToProps = dispatch => ({
  fetchSinglePage: id => {
    dispatch(fetchSinglePage(id))
  },
  fetchPosts: () => {
    dispatch(fetchPosts())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
