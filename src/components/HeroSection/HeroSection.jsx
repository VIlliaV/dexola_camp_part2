import { formatEther } from 'viem';
import { CONTRACT_INFO } from '../../constants/constants';
import ContractInfo from '../ContractInfo/ContractInfo';

import SectionWrapper from '../Section/SectionWrapper';
import { HeroSectionStyled } from './HeroSection.styled';

// import { useContractReads } from 'wagmi';
import { useContextContract } from '../../Context';

const HeroSection = () => {
  const { availableRewards, stakedBalance, rewardForDuration, totalSupply, periodFinish } = useContextContract();

  // const { data: dataTest } = useContractReads({
  //   contracts: [
  // {
  //   ...STAR_RUNNER_STAKING_CONTRACT,
  //   functionName: 'balanceOf',
  //   args: [address],
  //   chainId: 11155111,
  //   watch: updateInfo,
  // },
  // {
  //   ...STAR_RUNNER_STAKING_CONTRACT,
  //   functionName: 'getRewardForDuration',
  //   chainId: 11155111,
  //   watch: updateInfo,
  // },
  // {
  //   ...STAR_RUNNER_STAKING_CONTRACT,
  //   functionName: 'totalSupply',
  //   chainId: 11155111,
  //   watch: updateInfo,
  // },
  // {
  //   ...STAR_RUNNER_STAKING_CONTRACT,
  //   functionName: 'periodFinish',
  //   chainId: 11155111,
  //   watch: updateInfo,
  // },
  //   ],
  //   watch: updateInfo,
  // });

  // const [
  //   // { result: stakedBalanceResultBig = BigInt('0') } = {},
  //   // { result: rewardForDuration = BigInt('0') } = {},
  //   // { result: totalAmountUsers = BigInt('1') } = {},
  //   { result: periodFinish = '0' } = {},
  // ] = dataTest || [];

  const stakedBalanceResult = formatEther(stakedBalance);

  const aprResult = (Number(rewardForDuration) * 100) / Number(totalSupply);

  const daysResult = (Number(periodFinish) - Math.floor(Date.now()) / 1000) / 86400 || 0;

  const earnedResult = formatEther(availableRewards);

  const { stakedBalance: StakedBalanceFromInfo, apr, days, rewards } = CONTRACT_INFO;
  return (
    <HeroSectionStyled>
      <SectionWrapper>
        <h1>StarRunner Token staking</h1>
        <ul className="contract_info">
          <li>
            <ContractInfo data={+stakedBalanceResult} variable={StakedBalanceFromInfo} />
          </li>
          <li>
            <ContractInfo data={aprResult} variable={apr} />
          </li>
          <li>
            <ContractInfo data={daysResult} variable={days} />
          </li>
          <li>
            <ContractInfo data={+earnedResult} variable={rewards} />
          </li>
        </ul>
      </SectionWrapper>
    </HeroSectionStyled>
  );
};

export default HeroSection;
