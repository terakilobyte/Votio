import request from 'axios';

class AuthSpinner extends React.Component {

  constructor (props) {
    super(props);
    this.getJWT = this.getJWT.bind(this);
  }

  componentDidMount () {
    this.getJWT();
  }

  getJWT () {
    request
      .get('/credentials')
      .then(res => {
        console.log(res);
        const creds = res.data;
        window.localStorage.user = creds.user;
        window.localStorage.jwt = creds.jwt;
        console.log(window.localStorage.user, window.localStorage.jwt);
        console.log(this.props);
        this.props.history.push('/');
      })
      .catch(res => {
        console.error(res.data);
      });
  }

  render () {
    return (
      <div id='spin-rings' className='a3d'>
        <div id='spin-rings' className='s3d'>
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s2d' />
        </div>
        <div id='spin-rings' className='s3d'>
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s2d' />
        </div>
        <div id='spin-rings' className='s3d'>
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s2d' />
        </div>
        <div id='spin-rings' className='s3d'>
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s4gon' />
          <div id='spin-rings' className='s2d' />
        </div>
      </div>
    );
  }
}
export default AuthSpinner;
