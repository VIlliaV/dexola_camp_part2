// import SectionWrapper from '../Section/SectionWrapper';
import { CONTRACT_INFO } from '../../constants/contractInfo';
import ContractInfo from '../ContractInfo/ContractInfo';
import HeadContainer from '../HeadContainer/HeadContainer';
import { ContractWrapperStyled } from './ContractWrapper.styled';

const ContractWrapper = () => {
  const { balance, apr, days, rewards } = CONTRACT_INFO;
  return (
    <ContractWrapperStyled>
      <HeadContainer>
        <h1>StarRunner Token staking</h1>
        <div className="contract_info">
          <ContractInfo result={0.0} variable={balance} />
          <ContractInfo result={0.0} variable={apr} />
          <ContractInfo result={0.0} variable={days} />
          <ContractInfo result={0.0} variable={rewards} />
        </div>
      </HeadContainer>
    </ContractWrapperStyled>
  );
};

export default ContractWrapper;
