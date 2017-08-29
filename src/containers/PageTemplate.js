import { connect } from 'react-redux'

import PageTemplate from '../components/PageTemplate'
import { fetchPage } from '../actions/page'
import { fetchMedia } from '../actions/media'
import { getPageDetail, getFeaturedMedia } from '../selectors'

const mapStateToProps = (state, ownprops) => ({
  pageId: ownprops.pageId,
  page: getPageDetail(state, ownprops),
  featuredMedia: getFeaturedMedia(state, ownprops),
})

const mapDispatchToProps = dispatch => ({
  fetchPage: id => {
    dispatch(fetchPage(id))
  },
  fetchMedia: id => {
    dispatch(fetchMedia(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PageTemplate)
