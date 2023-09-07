import Button from '../Buttons/Button';
import Logo from '../Logo/Logo';
import WalletInfo from '../ContractWrapper/ContractWrapper';
import { HeaderContainer, HeaderContainerNav } from './Header.styled';

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContainerNav>
        <Logo />
        <Button>Connect Wallet</Button>
      </HeaderContainerNav>
      <WalletInfo />
    </HeaderContainer>
  );
};

export default Header;
