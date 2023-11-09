import { ContractInfoStyled } from './ContractInfo.styled';
import SignTip from '../Tip/SignTip/SignTip';
import { result, resultType } from '@/utils/formating';
import { useContextContract } from '../../Context';
import { useResize } from '@/utils/hooks/useResize';
import { size } from '@/styles/media';
import { useStats } from '../../utils/hooks/ContractHooks/useStats';

const ContractInfo = ({ data = {} }) => {
  const { text, value, type } = data;

  const { symbol } = useContextContract();
  const { statsName } = useStats();
  const { widthResize } = useResize();

  const isMobile =
    widthResize < size.tablet && type !== resultType.dateType && type !== resultType.approxType
      ? resultType.mobileType
      : type;
  const contractResult = result(isMobile, value);

  return (
    <ContractInfoStyled>
      <div className="contract_data contract_item">
        <p className="contract_result">{contractResult}</p>
        {(text === statsName.balance || text === statsName.rewards) && <p className="contract_token_name">{symbol}</p>}
      </div>
      {text !== statsName.days ? <SignTip variable={data} className="contract_item" /> : <div></div>}
      <p className="text_variable contract_item">{text}</p>
    </ContractInfoStyled>
  );
};

export default ContractInfo;
