import { formatEther } from 'viem';
import { CONTRACT_INFO } from '../../constants/constants';
import ContractInfo from '../ContractInfo/ContractInfo';

import SectionWrapper from '../Section/SectionWrapper';
import { HeroSectionStyled } from './HeroSection.styled';

import { useContextContract } from '../../Context';

const HeroSection = () => {
  const { availableRewards, stakedBalance, rewardForDuration, totalSupply, periodFinish } = useContextContract();

  const stakedBalanceResult = formatEther(stakedBalance);
  console.log('🚀 ~ stakedBalanceResult:', stakedBalanceResult);

  const aprResult = (Number(rewardForDuration) * 100) / Number(totalSupply);

  const daysResult = Math.ceil((Number(periodFinish) - Date.now() / 1000) / 86400) || 0;

  const earnedResult = formatEther(availableRewards);

  const { stakedBalanceInfo, apr, days, rewards } = CONTRACT_INFO;
  return (
    <HeroSectionStyled>
      <SectionWrapper>
        <h1>StarRunner Token staking</h1>
        <ul className="contract_info">
          <li>
            <ContractInfo data={+stakedBalanceResult} variable={stakedBalanceInfo} />
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
