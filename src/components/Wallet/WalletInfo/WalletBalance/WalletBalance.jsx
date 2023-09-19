import stru from '@/images/STRU.webp';
import stru2x from '@/images/STRU@2x.webp';
import struDef from '@/images/STRU.jpg';
import { WalletBalanceStyled } from './WalletBalance.styled';
import { useBalance } from 'wagmi';
import { useAccount } from 'wagmi';
import { formatDecimalPlaces } from '@/utils/formating';

const WalletBalance = () => {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
    token: '0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83',
  });

  const tokenName = 'STRU';

  return (
    <WalletBalanceStyled>
      <picture>
        <source srcSet={`${stru} 1x, ${stru2x} 2x`} type="image/webp" />
        <img src={`${struDef}`} alt={tokenName} />
      </picture>
      <h3>
        {formatDecimalPlaces(+data?.formatted, 0)} {tokenName}
      </h3>
    </WalletBalanceStyled>
  );
};

export default WalletBalance;
