import { RewardStyled, RewardUnit, RewardValue } from './Reward.styled';
import { useContextContract } from '../../../../Context';

import { formatDecimalPlaces } from '@/utils/formating';
import { useContractReadData } from '../../../../utils/hooks/ContractHooks/useCustomContractRead';

const Reward = ({ amountToStake = 0 }) => {
  const { symbol } = useContextContract();
  const { totalAvailableRewards } = useContractReadData({ amountToStake });

  const totalAvailableRewardsFormatting = formatDecimalPlaces(totalAvailableRewards, 0);

  return (
    <RewardStyled>
      Reward rate:
      <RewardValue>{totalAvailableRewardsFormatting}</RewardValue>
      <RewardUnit>{symbol}/week</RewardUnit>
    </RewardStyled>
  );
};

export default Reward;
