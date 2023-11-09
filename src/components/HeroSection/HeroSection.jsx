import { useStats } from '../../utils/hooks/ContractHooks/useStats';
import ContractInfo from '../ContractInfo/ContractInfo';

import SectionWrapper from '../Section/SectionWrapper';
import { HeroSectionStyled } from './HeroSection.styled';

const HeroSection = () => {
  const { contractStats } = useStats();
  return (
    <HeroSectionStyled>
      <SectionWrapper>
        <h1>StarRunner Token staking</h1>
        <ul className="contract_info">
          {contractStats.map(item => (
            <li key={item.text}>
              <ContractInfo data={item} />
            </li>
          ))}
        </ul>
      </SectionWrapper>
    </HeroSectionStyled>
  );
};

export default HeroSection;
