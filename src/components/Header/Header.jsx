import Button from '../Buttons/Button';
import Logo from '../Logo/Logo';
import ContractWrapper from '../ContractWrapper/ContractWrapper';
import { HeaderContainer, HeaderContainerNav } from './Header.styled';
import { useState } from 'react';
import Wallet from '../Wallet/Wallet';

const Header = () => {
  const [connect, setConnect] = useState(false);
  const connectMask = () => {
    setConnect(!connect);
  };
  return (
    <HeaderContainer>
      <HeaderContainerNav>
        <Logo />
        {!connect ? <Button onClick={connectMask}>Connect Wallet</Button> : <Wallet />}
      </HeaderContainerNav>
      <ContractWrapper />
    </HeaderContainer>
  );
};

export default Header;
