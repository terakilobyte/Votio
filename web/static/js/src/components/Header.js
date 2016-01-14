import { Link } from 'react-router';
import {connect} from 'react-redux';
import {Socket} from 'phoenix';
import SocketHandler from 'components/SocketHandler';

const mapStateToProps = (state) => ({user: state.auth.user});

const mapDispatchToProps = (dispatch) => ({dispatch});

export class Header extends React.Component {


  static propTypes = {
    user: React.PropTypes.object
  }

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    let summarySocket;
    summarySocket = new Socket('/socket');
    summarySocket.connect();
    let topics = summarySocket
            .channel('topics:summary', {})
            .join()
            .receive('ok', resp => {
              console.log('got summary', resp);
            })
            .receive('error', resp => {
              console.log('Unable to join', resp);
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
