import { connect } from 'react-redux'

import Header from '../components/Header'

const mapStateToProps = state => ({
  pages: state.entities.pages,
  router: state.router,
})

export default connect(mapStateToProps)(Header)
