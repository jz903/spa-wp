import { connect } from 'react-redux'

import Loading from '../components/Loading'

const mapStateToProps = state => ({
  isLoading: state.system.isLoading,
})

export default connect(mapStateToProps)(Loading)
