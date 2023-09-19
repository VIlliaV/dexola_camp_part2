import { CONTRACT_INFO } from '../../constants/constants';
import { ContractInfoStyled } from './ContractInfo.styled';

import SignTip from '../Tip/SignTip/SignTip';
import { result } from '../../utils/formating';

const ContractInfo = ({ data = 0, variable = {}, tokenName = 'TEST' }) => {
  const { stakedBalance, rewards, days } = CONTRACT_INFO;

  return (
    <ContractInfoStyled>
      <div className="contract_data contract_item">
        <p className="contract_result">{result(variable, data)}</p>
        {(variable === stakedBalance || variable === rewards) && <p className="contract_token_name">{tokenName}</p>}
      </div>
      {variable !== days ? <SignTip variable={variable} className="contract_item" /> : <div></div>}
      <p className="text_variable contract_item">{variable.text}</p>
    </ContractInfoStyled>
  );
};

export default ContractInfo;
