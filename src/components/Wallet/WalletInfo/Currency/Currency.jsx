import WalletAddress from '../WalletAddress/WalletAddress';
import { CurrencyStyled, SvgStyled } from './Currency.styled';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useBalance } from 'wagmi';
import { useAccount } from 'wagmi';
import { formatDecimalPlaces } from '../../../../utils/formating';

const Currency = () => {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });
  const currency = +data?.formatted || 0;
  const tokenName = 'ETH';

  const { open } = useWeb3Modal();
  return (
    <CurrencyStyled onClick={() => open()}>
      <SvgStyled />
      <h3>
        {formatDecimalPlaces(currency)} {tokenName}
      </h3>
      <span>|</span>
      <WalletAddress />
    </CurrencyStyled>
  );
};

export default Currency;
