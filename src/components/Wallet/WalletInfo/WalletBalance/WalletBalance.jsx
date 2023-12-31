import stru from '@/assets/images/STRU.webp';
import stru2x from '@/assets/images/STRU@2x.webp';
import struDef from '@/assets/images/STRU.jpg';
import { WalletBalanceStyled } from './WalletBalance.styled';
import { formatDecimalPlaces } from '@/utils/formating';
import { useContextContract } from '../../../../Context';

const WalletBalance = () => {
  const { symbol, balance } = useContextContract();

  return (
    <WalletBalanceStyled>
      <picture>
        <source srcSet={`${stru} 1x, ${stru2x} 2x`} type="image/webp" />
        <img src={`${struDef}`} alt={symbol} />
      </picture>
      <h3>
        {formatDecimalPlaces(balance, 0)} {symbol}
      </h3>
    </WalletBalanceStyled>
  );
};

export default WalletBalance;
