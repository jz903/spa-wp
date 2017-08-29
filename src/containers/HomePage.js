import { connect } from 'react-redux'

import Home from '../components/Home'
import { fetchPage } from '../actions/page'
import { fetchAllPosts } from '../actions/post'
import { getPageDetail } from '../selectors'

const mapStateToProps = (state, ownProps) => ({
  pageId: ownProps.pageId,
  page: getPageDetail(state, ownProps),
  posts: state.entities.posts,
})

const mapDispatchToProps = dispatch => ({
  fetchPage: id => {
    dispatch(fetchPage(id))
  },
  fetchAllPosts: () => {
    dispatch(fetchAllPosts())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
