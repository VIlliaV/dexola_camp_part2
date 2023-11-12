import { SvgPending } from '../../styles/styledConst/svgStyled';
import { ButtonConnectStyled } from './ButtonConnect.styled';
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react';

const ButtonConnect = () => {
  const { open } = useWeb3Modal();
  const { open: isOpen } = useWeb3ModalState();
  return (
    <ButtonConnectStyled onClick={() => open()} $isOpen={isOpen}>
      {isOpen ? <SvgPending /> : 'Connect Wallet'}
    </ButtonConnectStyled>
  );
};

export default ButtonConnect;
