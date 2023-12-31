import { useContractRead } from 'wagmi';
import {
  STAR_RUNNER_STAKING_CONTRACT,
  STAR_RUNNER_TOKEN_CONTRACT,
  STAR_RUNNER_STAKING_ADDRESS,
} from '../../../constants/constants';
import { formatEther } from 'viem';
import { useWalletInfo } from './useWalletInfo';

const useCustomContractRead = ({
  functionName,
  contract = STAR_RUNNER_STAKING_CONTRACT,
  args = [],
  watch = true,
  enabled = true,
}) => {
  const { data } = useContractRead({ ...contract, functionName, args, watch, enabled });

  return { data };
};

const useContractReadData = ({ amountToStake = 0 }) => {
  const { address, isConnected } = useWalletInfo({});

  const { data: stakedBalanceBig = '0' } = useCustomContractRead({
    functionName: 'balanceOf',
    args: [address],
    enabled: isConnected,
  });
  const stakedBalance = +formatEther(stakedBalanceBig);

  const { data: availableRewardsBig = '0' } = useCustomContractRead({
    functionName: 'earned',
    args: [address],
    enabled: isConnected,
  });
  const availableRewards = +formatEther(availableRewardsBig);

  const { data: periodFinishBig = '0' } = useCustomContractRead({ functionName: 'periodFinish' });
  const periodFinish = Number(periodFinishBig);

  const { data: rewardRateBig = '0' } = useCustomContractRead({ functionName: 'rewardRate' });
  const rewardRate = +formatEther(rewardRateBig);

  const { data: totalSupplyBig = '0' } = useCustomContractRead({ functionName: 'totalSupply' });
  const totalSupply = +formatEther(totalSupplyBig);

  const { data: rewardForDurationBig = '0' } = useCustomContractRead({ functionName: 'getRewardForDuration' });
  const rewardForDuration = +formatEther(rewardForDurationBig);

  const realRemaining = periodFinish - Math.floor(Date.now()) / 1000;
  const remaining = realRemaining > 0 ? realRemaining : 0;

  const available = remaining * rewardRate;

  const realTotalAvailableRewards = Number((stakedBalance * available) / totalSupply + amountToStake);
  const totalAvailableRewards = isFinite(realTotalAvailableRewards) ? realTotalAvailableRewards : 0;

  const realApr = (rewardForDuration * 100) / totalSupply;
  const apr = isFinite(realApr) ? realApr : 0;

  const days = Math.ceil(remaining / 86400);

  const { data: allowanceBig = '0' } = useCustomContractRead({
    contract: STAR_RUNNER_TOKEN_CONTRACT,
    functionName: 'allowance',
    args: [address, STAR_RUNNER_STAKING_ADDRESS],
    enabled: isConnected,
  });
  const allowance = +formatEther(allowanceBig);
  return { stakedBalance, availableRewards, totalAvailableRewards, apr, days, allowance };
};

export { useCustomContractRead, useContractReadData };
