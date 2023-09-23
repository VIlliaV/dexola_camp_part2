// import { useContractInfo } from '../../../../utils/hooks/useContractInfo';
import { formatEther } from 'viem';
import { STAR_RUNNER_STAKING_CONTRACT } from '../../../../constants/constants';
import { RewardStyled, RewardUnit, RewardValue } from './Reward.styled';
import { formatDecimalPlaces } from '../../../../utils/formating';

import { useContractRead, useAccount } from 'wagmi';

const Reward = ({ startBalance }) => {
  // console.log('🚀 ~ startBalance:', startBalance);
  const { address } = useAccount();
  // const reward = 1;
  const unit = 'STRU/week';
  // const { address } = useAccount();
  const { data: periodFinish = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'periodFinish',
    // chainId: 11155111,
  });

  const { data: rewardRate = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'rewardRate',
    // chainId: 11155111,
  });
  const { data: stakedBalance = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'balanceOf',
    args: [address],
    // chainId: 11155111,
  });
  const { data: totalSupply = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'totalSupply',
    // args: [address],
    // chainId: 11155111,
  });

  const remaining = Number(periodFinish) - Math.floor(Date.now()) / 1000;
  const available = remaining * formatEther(rewardRate);

  const totalAvailableRewards = (formatEther(stakedBalance) * available) / formatEther(totalSupply) + +startBalance;

  return (
    <RewardStyled>
      Reward rate:
      <RewardValue>{formatDecimalPlaces(+totalAvailableRewards, 0)}</RewardValue>
      <RewardUnit>{unit}</RewardUnit>
    </RewardStyled>
  );
};

export default Reward;
