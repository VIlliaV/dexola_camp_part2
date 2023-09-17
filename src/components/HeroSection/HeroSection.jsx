import { CONTRACT_INFO } from '../../constants/constants';
import ContractInfo from '../ContractInfo/ContractInfo';

import SectionWrapper from '../Section/SectionWrapper';
import { HeroSectionStyled } from './HeroSection.styled';

const HeroSection = () => {
  const { balance, apr, days, rewards } = CONTRACT_INFO;
  return (
    <HeroSectionStyled>
      <SectionWrapper>
        <h1>StarRunner Token staking</h1>
        <ul className="contract_info">
          <li>
            <ContractInfo result={0.0} variable={balance} tokenName="Next" />
          </li>
          <li>
            <ContractInfo result={0.0} variable={apr} />
          </li>
          <li>
            <ContractInfo result={0.0} variable={days} />
          </li>
          <li>
            <ContractInfo result={0.0} variable={rewards} tokenName="Next" />
          </li>
        </ul>
      </SectionWrapper>
    </HeroSectionStyled>
  );
};

export default HeroSection;
