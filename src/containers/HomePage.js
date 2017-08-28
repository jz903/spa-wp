import { connect } from 'react-redux'

import Home from '../components/Home'
import { fetchPosts } from '../actions/post'

const mapStateToProps = state => ({
  posts: state.entities.posts,
})

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => {
    dispatch(fetchPosts())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
