import WalletAddress from '../WalletAddress/WalletAddress';
import { CurrencyStyled, SvgStyled } from './Currency.styled';
import { useWeb3Modal } from '@web3modal/wagmi/react';
// import { useBalance } from 'wagmi';
// import { useAccount } from 'wagmi';
import { formatDecimalPlaces } from '@/utils/formating';
import { useWalletInfo } from '../../../../utils/hooks/useWalletInfo';

const Currency = () => {
  // const { address } = useAccount();
  // const { data } = useBalance({
  //   address,
  // });

  const { balance, symbol } = useWalletInfo({});
  // const currency = +data?.formatted || 0;
  // const tokenName = 'ETH';

  const { open } = useWeb3Modal();
  return (
    <CurrencyStyled onClick={() => open()}>
      <SvgStyled />
      <h3>
        {formatDecimalPlaces(balance)} {symbol}
      </h3>
      <span>|</span>
      <WalletAddress />
    </CurrencyStyled>
  );
};

export default Currency;
