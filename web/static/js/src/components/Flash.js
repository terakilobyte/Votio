import {actions as alertActions} from 'actions/alerts';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    success: state.alerts.success,
    errors: state.alerts.errors,
    info: state.alerts.info
  };
};

export class Flash extends React.Component {

  static propTypes = {
    success: React.PropTypes.string,
    errors: React.PropTypes.array,
    info: React.PropTypes.string,
    dismissAlert: React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
  }

  handleDismiss (type, id, e) {
    e.preventDefault();
    this.props.dismissAlert({type, id});
  }

  render () {
    let success, errors, info;

    success = this.props.success
      ? (
        <div className='alert alert-success' >
          {this.props.success}
          <button className='close'
                  onClick={this.handleDismiss.bind(this, 'success', null)}
                  type='button'>
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      )
    : null;

    errors = this.props.errors
      ? (
        this.props.errors.map(elem => {
          return (
            <div className='alert alert-danger'
                 key={elem.id}>
              {elem.error}
              <button className='close'
                      onClick={this.handleDismiss.bind(this, 'error', elem.id)}
                      type='button'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
          );
        }))
    : null;

    info = this.props.info
      ? (
        <div className='alert alert-info'
             >
          {this.props.info}
          <button className='close'
                  onClick={this.handleDismiss.bind(this, 'info', null)}
                  type='button'>
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      )
    : null;

    return (
      <div>
        {errors}
        {info}
        {success}
      </div>
    );
  }
}

export default connect(mapStateToProps, alertActions)(Flash);
