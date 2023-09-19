import { useAccount } from 'wagmi';
import { formatAddress } from '@/utils/formating';

const WalletAddress = () => {
  const { address } = useAccount();
  return <h3 className="wallet_address">{formatAddress(address)}</h3>;
};

export default WalletAddress;
