import WalletAddress from '../WalletAddress/WalletAddress';
import { CurrencyStyled, SvgStyled } from './Currency.styled';

const Currency = () => {
  const TYPE = 'ETH';
  const value = 4.5;
  return (
    <CurrencyStyled>
      <SvgStyled />
      <h3>
        {value} {TYPE}
      </h3>
      <span>|</span>
      <WalletAddress />
    </CurrencyStyled>
  );
};

export default Currency;
