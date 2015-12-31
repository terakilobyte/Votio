import Header from 'components/Header';
export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  render () {
    return (
      <div>
        <Header />
        <div className='view-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
