import {Socket} from 'phoenix';
import {getJWTToken} from 'actions/auth';
import {connect} from 'react-redux';
import {actions as socketActions} from 'actions/vote';

const mapStateToProps = (state) => {
  return {
    voteSocket:  state.vote.voteSocket,
    authenticated: state.auth.authenticated
  };
};

export class SocketHandler extends React.Component {

  static propTypes = {
    summarySocket: React.PropTypes.object,
    voteSocket: React.PropTypes.object,
    receiveTopic: React.PropTypes.func.isRequired,
    receiveVote: React.PropTypes.func.isRequired

  }

  constructor (props)  {
    super(props);
  }

  componentDidMount () {
    let topicSocket;
    topicSocket = new Socket('/socket');
    topicSocket.connect();
    const topics = topicSocket.channel('topics:lobby', {guardian_token: getJWTToken()});
    topics.join()
      .receive('ok', resp => {
        console.log('Joined successfully');
      })
      .receive('error', resp => {
        console.log('Error joining');
      });

    topics.on('vote', data => {
      this.props.receiveVote(data);
    });

    topics.on('new_topic', data => {
      this.props.receiveTopic(data);
    });
 }

  render () {
    return (
      <div />
    );
  }
}

export default connect(mapStateToProps, socketActions)(SocketHandler);
