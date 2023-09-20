import { useContractInfo } from '../../../../utils/hooks/useContractInfo';
import { RewardStyled, RewardUnit, RewardValue } from './Reward.styled';

// import { useAccount, useContractReads } from 'wagmi';

const Reward = () => {
  const reward = 1;
  const unit = 'TEST/week';

  const { balance, address } = useContractInfo();
  // console.log('🚀 ~ test:', test);
  // console.log('🚀 ~ useContractInfo:', useContractInfo());
  console.log('🚀 ~ balance:', balance, address);
  return (
    <RewardStyled>
      Reward rate:
      <RewardValue>{reward}</RewardValue>
      <RewardUnit>{unit}</RewardUnit>
    </RewardStyled>
  );
};

export default Reward;
