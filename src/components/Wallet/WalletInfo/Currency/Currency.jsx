import WalletAddress from '../WalletAddress/WalletAddress';
import { CurrencyStyled, SvgStyled } from './Currency.styled';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { formatDecimalPlaces } from '@/utils/formating';
import { useWalletInfo } from '../../../../utils/hooks/ContractHooks/useWalletInfo';

const Currency = () => {
  const { balance, symbol } = useWalletInfo({});

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
