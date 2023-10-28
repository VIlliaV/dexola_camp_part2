import { useAccount, useContractRead } from 'wagmi';
import { STAR_RUNNER_STAKING_CONTRACT } from '../../constants/constants';
import { formatEther } from 'viem';

const useCustomContractRead = ({ functionName, contract = STAR_RUNNER_STAKING_CONTRACT, args = [], watch = true }) => {
  const { data } = useContractRead({ ...contract, functionName, args, watch });

  return { data };
};

const useContractReadData = ({ amountToStake }) => {
  const { address } = useAccount();

  const { data: stakedBalanceBig = '0' } = useCustomContractRead({ functionName: 'balanceOf', args: [address] });
  const stakedBalance = +formatEther(stakedBalanceBig);

  const { data: availableRewardsBig = '0' } = useCustomContractRead({ functionName: 'earned', args: [address] });
  const availableRewards = +formatEther(availableRewardsBig);

  const { data: periodFinishBig = '0' } = useCustomContractRead({ functionName: 'periodFinish' });
  const periodFinish = Number(periodFinishBig);

  const { data: rewardRateBig = '0' } = useCustomContractRead({ functionName: 'rewardRate' });
  const rewardRate = +formatEther(rewardRateBig);

  const { data: totalSupplyBig = '0' } = useCustomContractRead({ functionName: 'totalSupply' });
  const totalSupply = +formatEther(totalSupplyBig);

  const { data: rewardForDurationBig = '0' } = useCustomContractRead({ functionName: 'getRewardForDuration' });
  const rewardForDuration = +formatEther(rewardForDurationBig);

  const remaining = periodFinish - Math.floor(Date.now()) / 1000;
  const available = remaining * rewardRate;

  const totalAvailableRewards = Number((stakedBalance * available) / totalSupply + amountToStake) || 0;
  console.log('🚀 ~ totalAvailableRewards:', totalAvailableRewards);

  return { stakedBalance, availableRewards, totalAvailableRewards, available, remaining };
};

export { useCustomContractRead, useContractReadData };
