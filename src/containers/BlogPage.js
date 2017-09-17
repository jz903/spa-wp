import { connect } from 'react-redux'

import Blog from '../components/Blog'
import { fetchPosts } from '../actions/post'

const mapStateToProps = state => ({
  posts: state.entities.posts,
  router: state.router,
})

export default connect(mapStateToProps, {
  fetchPosts,
})(Blog)
