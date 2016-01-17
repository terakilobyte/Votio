import {Socket} from 'phoenix';
import {getJWT} from 'actions/auth';
import {connect} from 'react-redux';
import {receiveVote, receiveTopic, assignVoteSocket} from 'actions/vote';
import {alertError} from 'actions/alerts';

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
    voteSocket: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired

  };

  constructor (props)  {
    super(props);
  }

  componentDidMount () {
    let topicSocket;
    topicSocket = new Socket('/socket');
    topicSocket.connect();
    const topics = topicSocket.channel('topics:lobby',
                                       {guardian_token: getJWT()});
    topics.join()
      .receive('ok', () => {
      })
      .receive('error', resp => {
        this.props.dispatch(alertError(resp));
      });

    topics.on('vote', data => {
      this.props.dispatch(receiveVote(data));
    });

    topics.on('new_topic', data => {
      this.props.dispatch(receiveTopic(data));
    });
    this.props.dispatch(assignVoteSocket(topics));
  }

  render () {
    return (
      <div />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocketHandler);
