import { Link } from 'react-router';
import SocketHandler from 'components/SocketHandler';

export default class Header extends React.Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
  }

  // handleClickAPI (e) {
  //   e.preventDefault();
  //   this.request
  //     .get('/api/topics', {
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(res => {
  //       console.error(res.data);
  //     });
  // }

  // handleClickPostAPI (e) {
  //   e.preventDefault();
  //   this.request
  //     .post('/api/topics/new', {
  //       'topic': {
  //         'title': 'This is a test',
  //         'categories': {'yes': 0, 'no' : 0}
  //       }
  //     })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(res => {
  //       console.log(res);
  //     });
  // }

  // handleClickTest (e) {
  //   e.preventDefault();
  //   this.request
  //     .get('/api/testmessage', {
  //       headers: {'Authorization': 'Bearer ' + window.localStorage.jwt}
  //     })
  //     .then(res => {
  //       console.log(res.data.id);
  //     })
  //     .catch(res => {
  //       console.error(res.data.error);
  //     });
  // }

  // handleClickAuth (e) {
  //   e.preventDefault();
  //   this.request
  //     .get('/credentials')
  //     .then(res => {
  //       console.log(res);
  //       const creds = res.data;
  //       window.localStorage.user = creds.user;
  //       window.localStorage.jwt = creds.jwt;
  //       console.log(window.localStorage.user, window.localStorage.jwt);
  //     })
  //     .catch(res => {
  //       console.error(res.data.error);
  //     });
  // }

  render () {
    return (
      <div classNameName='container'>
        <header className='header'>
          <nav role='navigation'>
            <ul className='nav nav-pills pull-right'>
              <li><Link to='/sign-in'>Sign In | Sign Up</Link></li>
            </ul>
          </nav>
          <span className='logo'></span>
        </header>
        <SocketHandler />
      </div>
    );
  }
}
