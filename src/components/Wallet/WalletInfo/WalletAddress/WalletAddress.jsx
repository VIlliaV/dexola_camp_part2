import { formatAddress } from '@/utils/formating';
import { useWalletInfo } from '../../../../utils/hooks/ContractHooks/useWalletInfo';

const WalletAddress = () => {
  const { address } = useWalletInfo({});
  return <h3 className="wallet_address">{formatAddress(address)}</h3>;
};

export default WalletAddress;
