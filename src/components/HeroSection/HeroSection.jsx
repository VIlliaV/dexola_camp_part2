import { CONTRACT_INFO, StarRunnerStakingAddress } from '../../constants/constants';
import ContractInfo from '../ContractInfo/ContractInfo';

import SectionWrapper from '../Section/SectionWrapper';
import { HeroSectionStyled } from './HeroSection.styled';
import { erc20ABI } from 'wagmi';

import { useAccount, useContractReads } from 'wagmi';

const StarRunnerStakingContract = {
  address: StarRunnerStakingAddress,
  abi: erc20ABI,
};

const HeroSection = () => {
  const { address } = useAccount();
  const { data, error } = useContractReads({
    contracts: [
      {
        ...StarRunnerStakingContract,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        ...StarRunnerStakingContract,
        functionName: 'getRewardForDuration',
        // args: ['90948769184027775744000'],
      },
    ],
  });
  console.log('🚀 ~ data:', data, error);

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
