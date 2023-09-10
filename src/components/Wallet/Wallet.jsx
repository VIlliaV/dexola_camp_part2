import { WalletWrapperStyled } from './Wallet.styled';
import WalletBalance from './WalletInfo/WalletBalance/WalletBalance';

const Wallet = ({ children }) => {
  return (
    <WalletWrapperStyled>
      <WalletBalance />

      {children}
    </WalletWrapperStyled>
  );
};

export default Wallet;
