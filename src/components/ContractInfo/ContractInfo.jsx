import { CONTRACT_INFO } from '@/constants/constants';
import { ContractInfoStyled } from './ContractInfo.styled';
import SignTip from '../Tip/SignTip/SignTip';
import { result, resultType } from '@/utils/formating';
import { useContextContract } from '../../Context';
import { useResize } from '@/utils/hooks/useResize';
import { size } from '@/styles/media';

const ContractInfo = ({ data = 0, variable = {} }) => {
  const { stakedBalance, rewards, days } = CONTRACT_INFO;
  const { tokenName } = useContextContract();
  const { widthResize } = useResize();

  const isMobile =
    widthResize < size.tablet && variable.type !== resultType.dateType && variable.type !== resultType.approxType
      ? resultType.mobileType
      : variable.type;
  const contractResult = result(isMobile, data);

  return (
    <ContractInfoStyled>
      <div className="contract_data contract_item">
        <p className="contract_result">{contractResult}</p>
        {(variable === stakedBalance || variable === rewards) && <p className="contract_token_name">{tokenName}</p>}
      </div>
      {variable.text !== days.text ? <SignTip variable={variable} className="contract_item" /> : <div></div>}
      <p className="text_variable contract_item">{variable.text}</p>
    </ContractInfoStyled>
  );
};

export default ContractInfo;
