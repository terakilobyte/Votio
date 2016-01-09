import {connect} from 'react-redux';
import {jwtRequest} from 'actions/auth';
import Spinner from 'components/Spinner';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({dispatch});

export class Auth extends React.Component {

  static propTypes = {
    history: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    jwtRequest(this.props.dispatch, this.props.history);
  }

  render () {
    return (
      <Spinner />
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
