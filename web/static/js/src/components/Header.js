import { Link } from 'react-router';
import request from 'superagent';


export default class Header extends React.Component {

  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    e.preventDefault();
    request
      .get('/credentials')
      .end((err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('data', JSON.parse(res.text));
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
                <div className='btn btn-danger'
                     onClick={this.handleClick} >
                  Test auth
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
