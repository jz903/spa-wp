import { connect } from 'react-redux'

import Header from '../components/Header'
import { updateTopMenuVisible } from '../actions/site'

const mapStateToProps = state => ({
  site: state.site,
  router: state.router,
})

export default connect(mapStateToProps, {
  updateTopMenuVisible,
})(Header)
