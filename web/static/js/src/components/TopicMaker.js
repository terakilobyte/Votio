import {connect} from 'react-redux';
import {actions as alertActions} from 'actions/alerts';

const mapStateToProps = () => ({});

class TopicMaker extends React.Component {

  static propTypes = {
    submitAction: React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      titleInput: '',
      categories: []
    };
  }

  handleTitleInput (e) {
    console.log( e.keyCode );
  }

  handleSubmit () {
    const toSubmit = {
      title: this.refs.title.value,
      categories: {}
    };

    let cat1, cat2;
    cat1 = this.refs.category1.value;
    cat2 = this.refs.category2.value;
    toSubmit.categories[cat1] = 0;
    toSubmit.categories[cat2] = 0;
    this.props.submitAction(toSubmit);
    this.refs.title.value = '';
    this.refs.category1.value = '';
    this.refs.category2.value = '';
  }

  render () {
    return (
      <div className='col-sm-12'>
        <form className='form-horizontal'>
          <div className='form-group'>
            <label htmlFor='title-input'
                   className='col-sm-2 control-label'>
              Title
            </label>
            <div className='col-sm-10'>
              <input type='text'
                     className='form-control'
                     id='title-input'
                     ref='title'/>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='categories'
                   className='col-sm-2 control-label'>
              Options
            </label>
            <div className='col-sm-10'>
              <input type='text'
                     className='form-control'
                     id='categories'
                     ref='category1'/>
            </div>
            <div className='col-sm-offset-2 col-sm-10'>
              <input type='text'
                     className='form-control'
                     id='categories'
                     ref='category2'/>
            </div>
          </div>
          <div className='btn btn-primary'
               onClick={this.handleSubmit}>
            Submit
            </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, alertActions)(TopicMaker);
