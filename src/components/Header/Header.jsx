import Button from '../Buttons/Button';
import Logo from '../Logo/Logo';
// import HeroSection from '../HeroSection/HeroSection';
import { HeaderContainer, HeaderContainerNav } from './Header.styled';
// import { useState } from 'react';
import Wallet from '../Wallet/Wallet';
import Currency from '../Wallet/WalletInfo/Currency/Currency';
// import { useGlobalContext } from '../../Wagmi/Wagmi';
import {
  useConnect,
  useAccount,
  // , useConnect, useDisconnect, useEnsAvatar, useEnsName
} from 'wagmi';

const Header = () => {
  // const [connect, setConnect] = useState(false);
  // const { isConnected, connectWallet } = useGlobalContext();
  const {
    connect,
    connectors,
    // , error, isLoading, pendingConnector
  } = useConnect();
  console.log('🚀 ~ connectors:', connectors);
  const {
    // address, connector,
    isConnected,
  } = useAccount();

  return (
    <HeaderContainer>
      <HeaderContainerNav>
        <Logo />
        {!isConnected ? (
          <Button onClick={() => connect(connectors)}>Connect Wallet</Button>
        ) : (
          <Wallet>
            <Currency />
          </Wallet>
        )}
      </HeaderContainerNav>
      {/* <HeroSection /> */}
    </HeaderContainer>
  );
};

export default Header;
