// import { useContractInfo } from '../../../../utils/hooks/useContractInfo';
import { STAR_RUNNER_STAKING_CONTRACT } from '../../../../constants/constants';
import { RewardStyled, RewardUnit, RewardValue } from './Reward.styled';

import { useContractRead, useAccount } from 'wagmi';

const Reward = () => {
  const { address } = useAccount();
  // const reward = 1;
  const unit = 'STRU/week';
  // const { address } = useAccount();
  const { data: periodFinish } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'periodFinish',
    // chainId: 11155111,
  });

  const { data: rewardRate } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'rewardRate',
    // chainId: 11155111,
  });
  const { data: stakedBalance } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'balanceOf',
    args: [address],
    // chainId: 11155111,
  });
  const { data: totalSupply } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'totalSupply',
    // args: [address],
    // chainId: 11155111,
  });

  const remaining = Number(periodFinish) - Math.floor(Date.now()) / 1000;
  const available = remaining * Number(rewardRate);
  const totalAvailableRewards =
    (Number(stakedBalance) * Number(available)) / Number(totalSupply) + Number(stakedBalance);

  // const { data } = useContractReads({
  //   contracts: [
  //     {
  //       ...STAR_RUNNER_STAKING_CONTRACT,
  //       functionName: 'balanceOf',
  //       args: [address],
  //       chainId: 11155111,
  //     },
  //     {
  //       ...STAR_RUNNER_STAKING_CONTRACT,
  //       functionName: 'getRewardForDuration',
  //       chainId: 11155111,
  //     },
  //     {
  //       ...STAR_RUNNER_STAKING_CONTRACT,
  //       functionName: 'totalSupply',
  //       chainId: 11155111,
  //     },
  //     {
  //       ...STAR_RUNNER_STAKING_CONTRACT,
  //       functionName: 'periodFinish',
  //       chainId: 11155111,
  //     },
  //     {
  //       ...STAR_RUNNER_STAKING_CONTRACT,
  //       functionName: 'earned',
  //       args: [address],
  //       chainId: 11155111,
  //     },
  //   ],
  // });
  // console.log('🚀 ~ data:', data);

  // const [
  //   { result: stakedBalanceResultBig = BigInt('0') } = {},
  //   { result: rewardForDuration = BigInt('0') } = {},
  //   { result: totalAmountUsers = BigInt('1') } = {},
  //   { result: periodFinish = undefined } = {},
  //   { result: earned = BigInt('0') } = {},
  // ] = data || [];

  return (
    <RewardStyled>
      Reward rate:
      <RewardValue>{totalAvailableRewards}</RewardValue>
      <RewardUnit>{unit}</RewardUnit>
    </RewardStyled>
  );
};

export default Reward;
