import { RewardStyled, RewardUnit, RewardValue } from './Reward.styled';
import { useContextContract } from '../../../../Context';

import { formatDecimalPlaces } from '@/utils/formating';
import { useContractReadData } from '../../../../utils/hooks/useCustomContractRead';

const Reward = ({ amountToStake = 0 }) => {
  const { tokenName } = useContextContract();
  const { totalAvailableRewards } = useContractReadData({ amountToStake });

  const totalAvailableRewardsFormatting = formatDecimalPlaces(totalAvailableRewards, 0);

  return (
    <RewardStyled>
      Reward rate:
      <RewardValue>{totalAvailableRewardsFormatting}</RewardValue>
      <RewardUnit>{tokenName}/week</RewardUnit>
    </RewardStyled>
  );
};

export default Reward;
