import { PureComponent } from 'react'
import { object, node } from 'prop-types'
import { withRouter } from 'react-router'

class ScrollToTop extends PureComponent {
  static propTypes = {
    location: object.isRequired,
    children: node.isRequired,
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
