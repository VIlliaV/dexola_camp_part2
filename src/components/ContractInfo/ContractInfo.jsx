import { useMemo } from 'react';
import { CONTRACT_INFO } from '../../constants/contractInfo';
import { ContractInfoStyled } from './ContractInfo.styled';
import ButtonHint from '../Buttons/ButtonHelp/ButtonHint';

const ContractInfo = ({ result = 0, variable = '' }) => {
  const { balance, apr, days, rewards } = CONTRACT_INFO;
  const textContractInfo = useMemo(() => {
    switch (variable) {
      case balance:
        return balance;
      case apr:
        return apr;
      case days:
        return days;
      case rewards:
        return rewards;
      default:
        return '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variable]);

  return (
    <ContractInfoStyled>
      <p>{result}</p>
      <p>{textContractInfo}</p>
      <ButtonHint />
    </ContractInfoStyled>
  );
};

export default ContractInfo;
