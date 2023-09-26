import Button from '../Buttons/Button';
import Logo from '../Logo/Logo';
import { HeaderContainer, HeaderContainerNav } from './Header.styled';
import Wallet from '../Wallet/Wallet';
import Currency from '../Wallet/WalletInfo/Currency/Currency';
import { useWeb3Modal } from '@web3modal/wagmi/react';

import { useAccount } from 'wagmi';

const Header = () => {
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();

  return (
    <HeaderContainer>
      <HeaderContainerNav>
        <Logo />
        {!isConnected ? (
          <Button onClick={() => open()}>Connect Wallet</Button>
        ) : (
          <Wallet>
            <Currency />
          </Wallet>
        )}
      </HeaderContainerNav>
    </HeaderContainer>
  );
};

export default Header;
