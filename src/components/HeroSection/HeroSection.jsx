import { CONTRACT_INFO } from '../../constants/constants';
import { useContractReadData } from '../../utils/hooks/ContractHooks/useCustomContractRead';
import ContractInfo from '../ContractInfo/ContractInfo';

import SectionWrapper from '../Section/SectionWrapper';
import { HeroSectionStyled } from './HeroSection.styled';

const HeroSection = () => {
  const { stakedBalance, apr, days, availableRewards } = useContractReadData({});

  const { stakedBalanceInfo, aprInfo, daysInfo, rewardsInfo } = CONTRACT_INFO;
  return (
    <HeroSectionStyled>
      <SectionWrapper>
        <h1>StarRunner Token staking</h1>
        <ul className="contract_info">
          <li>
            <ContractInfo data={stakedBalance} variable={stakedBalanceInfo} />
          </li>
          <li>
            <ContractInfo data={apr} variable={aprInfo} />
          </li>
          <li>
            <ContractInfo data={days} variable={daysInfo} />
          </li>
          <li>
            <ContractInfo data={availableRewards} variable={rewardsInfo} />
          </li>
        </ul>
      </SectionWrapper>
    </HeroSectionStyled>
  );
};

export default HeroSection;
