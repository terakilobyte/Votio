import {Socket} from 'phoenix';
import {getJWTToken} from 'actions/auth';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    voteSocket:  state.vote.voteSocket,
    authenticated: state.auth.authenticated
  };
};

const mapDispatchToProps = (dispatch) => ({dispatch});

export class SocketHandler extends React.Component {

  static propTypes = {
    summarySocket: React.PropTypes.object,
    voteSocket: React.PropTypes.object
  }

  constructor (props)  {
    super(props);
  }

  componentDidMount () {
    let summarySocket;
    summarySocket = new Socket('/socket');
    summarySocket.connect();
    const topics = summarySocket
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
    return (
      <div />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketHandler);
