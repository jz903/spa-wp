import { connect } from 'react-redux'

import PageTemplate from '../components/PageTemplate'
import { fetchSinglePage } from '../actions/page'
import { getPageDetail } from '../selectors'

const mapStateToProps = (state, ownprops) => ({
  pageId: ownprops.pageId,
  page: getPageDetail(state, ownprops),
})

const mapDispatchToProps = dispatch => ({
  fetchSinglePage: id => {
    dispatch(fetchSinglePage(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PageTemplate)
