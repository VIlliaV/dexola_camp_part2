import { useStats } from '../../utils/hooks/ContractHooks/useStats';
import ContractInfoItem from '../ContractInfo/ContractInfoItem';

import { ContractInfo, HeadContainerHero, SectionWrapperHero } from './HeroSection.styled';

const HeroSection = () => {
  const { contractStats } = useStats();
  return (
    <SectionWrapperHero>
      <HeadContainerHero>
        <h1>StarRunner Token staking</h1>
        <ContractInfo>
          {contractStats.map(item => (
            <li key={item.text}>
              <ContractInfoItem data={item} />
            </li>
          ))}
        </ContractInfo>
      </HeadContainerHero>
    </SectionWrapperHero>
  );
};

export default HeroSection;
