import {
  ContractInfoStyled,
  StatsDataStyled,
  StatsNameStyled,
  StatsTokenStyled,
  StatsValueStyled,
} from './ContractInfo.styled';
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
  const statsValue = result(isMobile, value);

  return (
    <ContractInfoStyled>
      <StatsDataStyled className="contract_item">
        <StatsValueStyled>{statsValue}</StatsValueStyled>
        {(text === statsName.balance || text === statsName.rewards) && <StatsTokenStyled>{symbol}</StatsTokenStyled>}
      </StatsDataStyled>
      {text !== statsName.days ? <SignTip variable={data} className="contract_item" /> : <div></div>}
      <StatsNameStyled className="contract_item">{text}</StatsNameStyled>
    </ContractInfoStyled>
  );
};

export default ContractInfo;
