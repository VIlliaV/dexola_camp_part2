import { formatEther } from 'viem';
import { RewardStyled, RewardUnit, RewardValue } from './Reward.styled';
import { useContextContract } from '../../../../Context';

import { formatDecimalPlaces } from '@/utils/formating';

const Reward = ({ startBalance }) => {
  const { tokenName, periodFinish, rewardRate, totalSupply, stakedBalance } = useContextContract();

  const remaining = Number(periodFinish) - Math.floor(Date.now()) / 1000 || 0;
  const available = remaining * formatEther(rewardRate || 0);
  const totalAvailableRewardsNoFormatting =
    Number((formatEther(stakedBalance) * available) / formatEther(totalSupply) + startBalance) || 0;
  const totalAvailableRewards = formatDecimalPlaces(totalAvailableRewardsNoFormatting, 0);

  return (
    <RewardStyled>
      Reward rate:
      <RewardValue>{totalAvailableRewards}</RewardValue>
      <RewardUnit>{tokenName}/week</RewardUnit>
    </RewardStyled>
  );
};

export default Reward;
