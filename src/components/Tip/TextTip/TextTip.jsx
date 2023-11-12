import { SvgToolTip } from '../../../styles/styledConst/svgStyled';
import { TextTipStyled, TipInfo, TipTitle } from './TextTip.styled';

const TextTip = ({ tip = '', text = '', isShow }) => {
  console.log('🚀 ~ isShow:', isShow);
  return (
    <>
      <TextTipStyled $isShow={isShow}>
        <TipTitle>{text}</TipTitle>
        <TipInfo>
          {tip.first}
          <br />
          {tip.second}
        </TipInfo>
      </TextTipStyled>
      <SvgToolTip />
    </>
  );
};

export default TextTip;
