// import { useContractInfo } from '../../../../utils/hooks/useContractInfo';
import { formatEther } from 'viem';
import { STAR_RUNNER_STAKING_CONTRACT } from '../../../../constants/constants';
import { RewardStyled, RewardUnit, RewardValue } from './Reward.styled';
import { formatDecimalPlaces } from '../../../../utils/formating';

import { useContractRead, useAccount } from 'wagmi';
import { useContextContract } from '../../../../Context';

const Reward = ({ startBalance }) => {
  const { address } = useAccount();
  const { updateInfo, tokenName } = useContextContract();

  // const d = 'STRU/week';
  // const { address } = useAccount();
  const { data: periodFinish = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'periodFinish',
    watch: updateInfo,
    // chainId: 11155111,
  });

  const { data: rewardRate = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'rewardRate',
    watch: updateInfo,
    // chainId: 11155111,
  });
  const { data: stakedBalance = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'balanceOf',
    args: [address],
    watch: updateInfo,
    // chainId: 11155111,
  });
  const { data: totalSupply = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'totalSupply',
    watch: updateInfo,
    // args: [address],
    // chainId: 11155111,
  });

  const remaining = Number(periodFinish) - Math.floor(Date.now()) / 1000 || 0;
  const available = remaining * formatEther(rewardRate || 0);
  const totalAvailableRewards =
    Number((formatEther(stakedBalance) * available) / formatEther(totalSupply) + startBalance) || 0;

  return (
    <RewardStyled>
      Reward rate:
      <RewardValue>{formatDecimalPlaces(totalAvailableRewards, 0)}</RewardValue>
      <RewardUnit>{tokenName}/week</RewardUnit>
    </RewardStyled>
  );
};

export default Reward;
