import stru from '@/images/STRU.webp';
import stru2x from '@/images/STRU@2x.webp';
import struDef from '@/images/STRU.jpg';
import { WalletBalanceStyled } from './WalletBalance.styled';
import { formatDecimalPlaces } from '@/utils/formating';
import { useContextContract } from '../../../../Context';

const WalletBalance = () => {
  const { tokenName, balance } = useContextContract();

  return (
    <WalletBalanceStyled>
      <picture>
        <source srcSet={`${stru} 1x, ${stru2x} 2x`} type="image/webp" />
        <img src={`${struDef}`} alt={tokenName} />
      </picture>
      <h3>
        {formatDecimalPlaces(balance, 0)} {tokenName}
      </h3>
    </WalletBalanceStyled>
  );
};

export default WalletBalance;
