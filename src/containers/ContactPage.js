import { connect } from 'react-redux'

import Contact from '../components/Contact'
import { submitComment } from '../actions/comment'

const mapStateToProps = (state, ownProps) => ({
  pageId: ownProps.pageId,
})

export default connect(mapStateToProps, {
  submitComment,
})(Contact)
