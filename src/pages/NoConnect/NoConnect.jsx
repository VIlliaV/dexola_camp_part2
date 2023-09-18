// import { useGlobalContext } from '../../Context/Context';
import Button from '../../components/Buttons/Button';
import { NoConnectStyled, SvgStyled } from './NoConnect.styled';
import { useConnect } from 'wagmi';

const NoConnect = () => {
  // const { connectWallet } = useGlobalContext();
  const {
    connect,
    connector,
    // , error, isLoading, pendingConnector
  } = useConnect();
  console.log('🚀 ~ connector:', connector);
  return (
    <NoConnectStyled>
      <div className="no_connect_info">
        <SvgStyled />
        <p>
          To start staking you need <br />
          to connect you wallet first
        </p>
      </div>
      <Button onClick={() => connect()}>Connect Wallet</Button>
    </NoConnectStyled>
  );
};

export default NoConnect;
