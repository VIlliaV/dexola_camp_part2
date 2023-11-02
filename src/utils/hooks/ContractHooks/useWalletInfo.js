import { useAccount, useBalance } from 'wagmi';

const useWalletInfo = ({ tokenForBalance = undefined }) => {
  const { address, isConnected } = useAccount();

  const { data: balanceData } = useBalance({
    address,
    token: tokenForBalance,
    watch: true,
    enabled: isConnected,
  });
  const balance = +balanceData?.formatted || 0;

  const symbol = !balanceData?.symbol ? ':(' : balanceData?.symbol === 'SR' ? 'STRU' : balanceData?.symbol;

  return { address, isConnected, balance, symbol };
};

export { useWalletInfo };
