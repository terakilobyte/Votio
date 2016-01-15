import { Link } from 'react-router';
import {connect} from 'react-redux';
import {Socket} from 'phoenix';
import SocketHandler from 'components/SocketHandler';
import {actions as voteActions} from 'actions/vote';
import {actions as alertActions} from 'actions/alerts';

const mapStateToProps = (state) => ({user: state.auth.user});

export class Header extends React.Component {


  static propTypes = {
    user: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    let summarySocket;
    summarySocket = new Socket('/socket');
    summarySocket.connect();
    summarySocket
            .channel('topics:summary', {})
            .join()
            .receive('ok', resp => {
              this.props.dispatch(voteActions.receiveInitialState(resp));
              summarySocket.disconnect();
            })
            .receive('error', resp => {
              this.props.dispatch(alertActions.alertError(resp));
              summarySocket.disconnect();
            });
  }

  render () {
    let option;
    if (this.props.user) {
      option = (
        <div>
          Welcome {this.props.user.name}
          <SocketHandler />
        </div>
      );
    } else {
      option = <li><Link to='/sign-in'>Sign In | Sign Up</Link></li>;
    }

    return (
      <div classNameName='container'>
        <header className='header'>
          <nav role='navigation'>
            <ul className='nav nav-pills pull-right'>
              {option}
            </ul>
          </nav>
          <span className='logo'></span>
        </header>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
