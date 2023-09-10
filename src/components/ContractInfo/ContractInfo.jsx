import { CONTRACT_INFO } from '../../constants/contractInfo';
import { ContractInfoStyled } from './ContractInfo.styled';

import SignTip from '../Tip/SignTip/SignTip';
import { result } from '../../utils/formating';

const ContractInfo = ({ data = 0, variable = {}, tokenName = 'TEST' }) => {
  const { balance, rewards } = CONTRACT_INFO;

  return (
    <ContractInfoStyled>
      <div className="contract_data">
        <p className="contract_result">{result(variable, data)}</p>
        {(variable === balance || variable === rewards) && <p className="contract_token_name">{tokenName}</p>}
      </div>

      <div className="contract_variable">
        <p className="text_variable">{variable.text}</p>
        <SignTip tip={variable.tip} />
      </div>
    </ContractInfoStyled>
  );
};

export default ContractInfo;
