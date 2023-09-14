import NoConnect from '../../components/NoConnect/NoConnect';

const Stake = () => {
  const noConnect = true;
  return <div>{noConnect ? <NoConnect /> : <p>Stake</p>}</div>;
};

export default Stake;
