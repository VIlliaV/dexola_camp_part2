import stru from '@/images/STRU.webp';
import stru2x from '@/images/STRU@2x.webp';
import struDef from '@/images/STRU.jpg';
import { WalletBalanceStyled } from './WalletBalance.styled';

const WalletBalance = () => {
  const tokenName = 'STRU';
  const balance = 354;
  return (
    <WalletBalanceStyled>
      <picture>
        <source srcSet={`${stru} 1x, ${stru2x} 2x`} type="image/webp" />
        <img src={`${struDef}`} alt={tokenName} />
      </picture>
      <p>
        {balance} {tokenName}
      </p>
    </WalletBalanceStyled>
  );
};

export default WalletBalance;
