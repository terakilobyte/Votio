export default class Login extends React.Component {
  static propTypes = {
  };

  render () {
    const auth = 'Sign up or Sign in';
    return (
      <div className='container-fluid'>
        <div className='text-center'>
          <a href='auth/github'>
            <div className='btn btn-primary'>
              {auth} with Github
            </div>
          </a>
        </div>
      </div>
    );
  }
}
