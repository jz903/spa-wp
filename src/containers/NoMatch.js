import { connect } from 'react-redux'

import NoMatch from '../components/NoMatch'

const mapStateToProps = state => ({
  isLoading: state.system.isLoading,
})

export default connect(mapStateToProps)(NoMatch)
