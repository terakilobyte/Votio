import { Link } from 'react-router';
import axios from 'axios';


export default class Header extends React.Component {

  constructor (props) {
    super(props);
    this.handleClickAuth = this.handleClickAuth.bind(this);
    this.handleClickAPI = this.handleClickAPI.bind(this);
    this.handleClickTest = this.handleClickTest.bind(this);
    this.request = axios.create({
      baseURL: 'http://lvh.me:4000',
      timeout: 1000
    });
  }

  handleClickAPI (e) {
    e.preventDefault();
    this.request
      .get('/api/test', {
        headers: {'Authorization': 'Bearer ' + window.localStorage.jwt}
      })
      .then(res => {
        console.log(res.data.message);
      })
      .catch(res => {
        console.error(res.data.error);
      });
  }

  handleClickTest (e) {
    e.preventDefault();
    this.request
      .get('/api/testmessage', {
        headers: {'Authorization': 'Bearer ' + window.localStorage.jwt}
      })
      .then(res => {
        console.log(res.data.id);
      })
      .catch(res => {
        console.error(res.data.error);
      });
  }

  handleClickAuth (e) {
    e.preventDefault();
    this.request
      .get('/credentials')
      .then(res => {
        console.log(res);
        const creds = res.data;
        window.localStorage.user = creds.user;
        window.localStorage.jwt = creds.jwt;
        console.log(window.localStorage.user, window.localStorage.jwt);
      })
      .catch(res => {
        console.error(res.data.error);
      });
  }

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
      </div>
    );
  }
}
//   <li>
//   <div id='test-auth'
// className='btn btn-danger'
// onClick={this.handleClickAuth} >
//   Test auth
// </div>
//   </li>
//   <li>
//   <div id='test-api'
// className='btn btn-success'
// onClick={this.handleClickAPI} >
//   Test API
// </div>
//   </li>
//   <li>
//   <div id='test-api'
// className='btn btn-success'
// onClick={this.handleClickTest} >
//   Test TestMessage
// </div>
//   </li>
