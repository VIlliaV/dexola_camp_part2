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
      </HeadContainer>
    </ContractWrapperStyled>
  );
};

export default ContractWrapper;
