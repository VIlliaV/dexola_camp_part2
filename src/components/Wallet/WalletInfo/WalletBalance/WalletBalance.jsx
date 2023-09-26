import stru from '@/images/STRU.webp';
import stru2x from '@/images/STRU@2x.webp';
import struDef from '@/images/STRU.jpg';
import { WalletBalanceStyled } from './WalletBalance.styled';
// import { useBalance } from 'wagmi';
// import { useAccount } from 'wagmi';
import { formatDecimalPlaces } from '@/utils/formating';
// import { STAR_RUNNER_TOKEN_ADDRESS } from '../../../../constants/constants';
import { useContextContract } from '../../../../Context';

const WalletBalance = () => {
  // const { address } = useAccount();
  // const { data } = useBalance({
  //   address,
  //   token: STAR_RUNNER_TOKEN_ADDRESS,
  // });
  // console.log('🚀 ~ data:', data);

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
