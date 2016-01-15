import {connect} from 'react-redux';
import {actions as voteActions} from 'actions/vote';
import TopicMaker from 'components/TopicMaker';
import Topic from 'components/Topic';

const mapStateToProps = (state) => {
  return {
    topics: state.vote.topics
  };
};

class VoteDisplay extends React.Component {

  static propTypes = {
    topics: React.PropTypes.array.isRequired,
    pushTopic: React.PropTypes.func.isRequired
  }

  render () {
    const topicList = this.props.topics.map(elem => {
      return (
        <Topic elem={elem.data}
               key={elem.data.id}/>
      );
    });

    return (
      <div>
        {topicList}
        <h3> Post a new topic
          <TopicMaker submitAction={this.props.pushTopic} />
        </h3>
      </div>
    );
  }
}

export default connect(mapStateToProps, voteActions)(VoteDisplay);
