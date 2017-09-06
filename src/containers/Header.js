import { connect } from 'react-redux'

import Header from '../components/Header'

const mapStateToProps = state => ({
  site: state.site,
  router: state.router,
})

export default connect(mapStateToProps)(Header)
