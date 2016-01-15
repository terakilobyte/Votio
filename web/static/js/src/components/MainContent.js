import VoteDisplay from 'components/VoteDisplay';
const MainContent = () => {
  return (
    <div className='container-fluid text-center'>
      <h2>Welcome to Vot.io, a realtime voting service!</h2>
      <VoteDisplay />
    </div>
  );
};

export default MainContent;
