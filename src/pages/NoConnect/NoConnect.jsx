import Button from '../../components/Buttons/Button';
import { NoConnectStyled, SvgStyled } from './NoConnect.styled';
import { useWeb3Modal } from '@web3modal/wagmi/react';

const NoConnect = () => {
  const { open } = useWeb3Modal();
  return (
    <NoConnectStyled>
      <div className="no_connect_info">
        <SvgStyled />
        <p>
          To start staking you need <br />
          to connect you wallet first
        </p>
      </div>
      <Button onClick={() => open()}>Connect Wallet</Button>
    </NoConnectStyled>
  );
};

export default NoConnect;
