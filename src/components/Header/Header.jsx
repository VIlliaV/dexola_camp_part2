import Button from '../Buttons/Button';
import Logo from '../Logo/Logo';
import { HeaderContainer } from './Header.styled';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo />
      <Button>Connect Wallet</Button>
    </HeaderContainer>
  );
};

export default Header;
