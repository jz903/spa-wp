import { connect } from 'react-redux'

import Blog from '../components/Blog'
import { fetchPosts } from '../actions/post'

const mapStateToProps = state => ({
  posts: state.entities.posts,
  postsIds: state.entities.postsIds,
  postsMeta: state.site.postsMeta,
  router: state.router,
})

export default connect(mapStateToProps, {
  fetchPosts,
})(Blog)
