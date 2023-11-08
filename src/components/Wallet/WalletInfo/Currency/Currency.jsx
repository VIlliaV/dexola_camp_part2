import WalletAddress from '../WalletAddress/WalletAddress';
import { CurrencyStyled } from './Currency.styled';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { formatDecimalPlaces } from '@/utils/formating';
import { useWalletInfo } from '../../../../utils/hooks/ContractHooks/useWalletInfo';
import { SvgAvatarETH } from '../../../../styles/styledConst/svgStyled';

const Currency = () => {
  const { balance, symbol } = useWalletInfo({});

  const { open } = useWeb3Modal();
  return (
    <CurrencyStyled onClick={() => open()}>
      <SvgAvatarETH />
      <h3>
        {formatDecimalPlaces(balance)} {symbol}
      </h3>
      <span>|</span>
      <WalletAddress />
    </CurrencyStyled>
  );
};

export default Currency;
