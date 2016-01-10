import { Link } from 'react-router';
import axios from 'axios';
import {Socket} from 'phoenix';

export default class Header extends React.Component {

  constructor (props) {
    super(props);
    this.handleClickAuth = this.handleClickAuth.bind(this);
    this.handleClickAPI = this.handleClickAPI.bind(this);
    this.handleClickTest = this.handleClickTest.bind(this);
    this.request = axios.create({
      headers: {'Authorization': 'Bearer ' + window.localStorage.jwt},
      timeout: 1000
    });
    this.handleClickPostAPI = this.handleClickPostAPI.bind(this);
  }

  componentDidMount () {
    const socket = new Socket('/socket');
    socket.connect();
    /* eslint-disable */
    const jwt = window.localStorage.jwt;
    /* eslint-enable */
    const topics = socket.channel('topics:lobby', {guardian_token: jwt});
    topics.join()
      .receive('ok', resp => {
        console.log('Joined successfully', resp);
      })
      .receive('error', resp => {
        console.log('Unable to join', resp);
      });
    topics.push('ping');
    topics.on('pong', data => {
      console.log(data);
    });
  }

  handleClickAPI (e) {
    e.preventDefault();
    this.request
      .get('/api/topics', {
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(res => {
        console.error(res.data);
      });
  }

  handleClickPostAPI (e) {
    e.preventDefault();
    this.request
      .post('/api/topics/new', {
        'topic': {
          'title': 'This is a test',
          'categories': {'yes': 0, 'no' : 0}
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(res => {
        console.log(res);
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
              <li>
                <div id='test-auth'
                     className='btn btn-danger'
                     onClick={this.handleClickAuth} >
                  Test auth
                </div>
              </li>
              <li>
                <div id='test-api'
                     className='btn btn-success'
                     onClick={this.handleClickAPI} >
                  Test API
                </div>
              </li>
              <li>
                <div id='test-api'
                     className='btn btn-success'
                     onClick={this.handleClickTest} >
                  Test TestMessage
                </div>
              </li>
              <li>
                <div id='test-api'
                     className='btn btn-success'
                     onClick={this.handleClickPostAPI} >
                  Test Post
                </div>
              </li>
            </ul>
          </nav>
          <span className='logo'></span>
        </header>
      </div>
    );
  }
}
