import { connect } from 'react-redux'

import CommonPage from '../components/CommonPage'
import { fetchMedia } from '../actions/media'
import { getPageDetail, getFeaturedMedia } from '../selectors'

const mapStateToProps = (state, ownprops) => ({
  page: getPageDetail(state, ownprops),
  featuredMedia: getFeaturedMedia(state, ownprops),
})

const mapDispatchToProps = dispatch => ({
  fetchMedia: id => {
    dispatch(fetchMedia(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CommonPage)
