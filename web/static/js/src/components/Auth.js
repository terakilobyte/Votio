import {connect} from 'react-redux';
import {jwtDispatch} from 'actions/auth';
import Spinner from 'components/Spinner';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({dispatch});

export class Auth extends React.Component {

  static propTypes = {
    history: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    jwtDispatch(this.props.dispatch,
                           this.props.history,
                           document.querySelector('meta[name="guardian_token"]').content);
  }

  render () {
    return (
      <Spinner />
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
