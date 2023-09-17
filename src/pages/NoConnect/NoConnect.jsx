import { useGlobalContext } from '../../Context/Context';
import Button from '../../components/Buttons/Button';
import { NoConnectStyled, SvgStyled } from './NoConnect.styled';

const NoConnect = () => {
  const { connectWallet } = useGlobalContext();
  return (
    <NoConnectStyled>
      <div className="no_connect_info">
        <SvgStyled />
        <p>
          To start staking you need <br />
          to connect you wallet first
        </p>
      </div>
      <Button onClick={connectWallet}>Connect Wallet</Button>
    </NoConnectStyled>
  );
};

export default NoConnect;
