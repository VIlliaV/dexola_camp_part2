import { fetchBalance } from 'wagmi/actions';

import { getAccount } from 'wagmi/actions';
import { STAR_RUNNER_TOKEN_ADDRESS } from '../../constants/constants';

const { address } = await getAccount();

const { formatted: formattedBalance } = await fetchBalance({
  address,
  token: STAR_RUNNER_TOKEN_ADDRESS,
});

export const useContractInfo = () => {
  const balance = formattedBalance;

  return { balance, address };
};
