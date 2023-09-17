import { RewardStyled, RewardUnit, RewardValue } from './Reward.styled';

const Reward = () => {
  const reward = 1;
  const unit = 'TEST/week';
  return (
    <RewardStyled>
      Reward rate:
      <RewardValue>{reward}</RewardValue>
      <RewardUnit>{unit}</RewardUnit>
    </RewardStyled>
  );
};

export default Reward;
