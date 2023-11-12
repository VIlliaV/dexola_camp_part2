import Logo from '../Logo/Logo';
import { HeaderContainer } from './Header.styled';
import Wallet from '../Wallet/Wallet';
import Currency from '../Wallet/WalletInfo/Currency/Currency';
import { useWalletInfo } from '../../utils/hooks/ContractHooks/useWalletInfo';
import ButtonConnect from '../Buttons/ButtonConnect';

const Header = () => {
  const { isConnected } = useWalletInfo({});

  return (
    <HeaderContainer>
      <Logo />
      {!isConnected ? (
        <ButtonConnect />
      ) : (
        <Wallet>
          <Currency />
        </Wallet>
      )}
    </HeaderContainer>
  );
};

export default Header;
