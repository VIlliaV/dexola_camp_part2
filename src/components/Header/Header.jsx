import Button from '../Buttons/Button';
import Logo from '../Logo/Logo';
import { HeaderContainer } from './Header.styled';
import Wallet from '../Wallet/Wallet';
import Currency from '../Wallet/WalletInfo/Currency/Currency';
import { useWeb3Modal } from '@web3modal/wagmi/react';

import { useWalletInfo } from '../../utils/hooks/ContractHooks/useWalletInfo';

const Header = () => {
  const { isConnected } = useWalletInfo({});
  const { open } = useWeb3Modal();

  return (
    <HeaderContainer>
      <Logo />
      {!isConnected ? (
        <Button onClick={() => open()}>Connect Wallet</Button>
      ) : (
        <Wallet>
          <Currency />
        </Wallet>
      )}
    </HeaderContainer>
  );
};

export default Header;
