import { connect } from 'react-redux'

import Header from '../components/Header'
import { getMenuDetail } from '../selectors'

const mapStateToProps = (state, ownProps) => ({
  menu: getMenuDetail(state, ownProps),
  router: state.router,
})

export default connect(mapStateToProps)(Header)
