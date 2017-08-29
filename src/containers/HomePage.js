import { connect } from 'react-redux'

import Home from '../components/Home'
import { fetchAllPosts } from '../actions/post'

const mapStateToProps = state => ({
  posts: state.entities.posts,
})

const mapDispatchToProps = dispatch => ({
  fetchAllPosts: () => {
    dispatch(fetchAllPosts())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
