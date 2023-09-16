import { RewardStyled, RewardUnit, RewardValue } from './Reward.styled';

const Reward = () => {
  const reward = 1;
  const valuta = 'TEST/week';
  return (
    <RewardStyled>
      Reward rate:
      <RewardValue>{reward}</RewardValue>
      <RewardUnit>{valuta}</RewardUnit>
    </RewardStyled>
  );
};

export default Reward;
