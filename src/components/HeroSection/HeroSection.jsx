import { formatEther } from 'viem';
import { CONTRACT_INFO, STAR_RUNNER_STAKING_CONTRACT } from '../../constants/constants';
import ContractInfo from '../ContractInfo/ContractInfo';

import SectionWrapper from '../Section/SectionWrapper';
import { HeroSectionStyled } from './HeroSection.styled';

import { useAccount, useContractReads } from 'wagmi';

const HeroSection = () => {
  const { address } = useAccount();

  const { data } = useContractReads({
    contracts: [
      {
        ...STAR_RUNNER_STAKING_CONTRACT,
        functionName: 'balanceOf',
        args: [address],
        chainId: 11155111,
      },
      {
        ...STAR_RUNNER_STAKING_CONTRACT,
        functionName: 'getRewardForDuration',
        chainId: 11155111,
      },
      {
        ...STAR_RUNNER_STAKING_CONTRACT,
        functionName: 'totalSupply',
        chainId: 11155111,
      },
      {
        ...STAR_RUNNER_STAKING_CONTRACT,
        functionName: 'periodFinish',
        chainId: 11155111,
      },
      {
        ...STAR_RUNNER_STAKING_CONTRACT,
        functionName: 'earned',
        args: [address],
        // chainId: 11155111,
      },
    ],
  });

  const [
    { result: stakedBalanceResultBig = BigInt('0') } = {},
    { result: rewardForDuration = BigInt('0') } = {},
    { result: totalAmountUsers = BigInt('1') } = {},
    { result: periodFinish = undefined } = {},
    { result: earned = BigInt('0') } = {},
  ] = data || [];

  const stakedBalanceResult = formatEther(stakedBalanceResultBig);

  const aprResult = (Number(rewardForDuration) * 100) / Number(totalAmountUsers);

  const daysResult = (Number(periodFinish) - Math.floor(Date.now()) / 1000) / 86400 || 0;

  const earnedResult = formatEther(earned);
  console.log('🚀 ~ earnedResult:', earnedResult);

  const { stakedBalance, apr, days, rewards } = CONTRACT_INFO;
  return (
    <HeroSectionStyled>
      <SectionWrapper>
        <h1>StarRunner Token staking</h1>
        <ul className="contract_info">
          <li>
            <ContractInfo data={+stakedBalanceResult} variable={stakedBalance} tokenName="STRU" />
          </li>
          <li>
            <ContractInfo data={aprResult} variable={apr} />
          </li>
          <li>
            <ContractInfo data={daysResult} variable={days} />
          </li>
          <li>
            <ContractInfo data={+earnedResult} variable={rewards} tokenName="STRU" />
          </li>
        </ul>
      </SectionWrapper>
    </HeroSectionStyled>
  );
};

export default HeroSection;
