import { SvgToolTip } from '../../../styles/styledConst/svgStyled';
import { TextTipStyled, TipInfo, TipTitle } from './TextTip.styled';

const TextTip = ({ tip = '', text = '' }) => {
  return (
    <>
      <TextTipStyled className="text_tip">
        <TipTitle>{text}</TipTitle>
        <TipInfo>
          {tip.first}
          <br />
          {tip.second}
        </TipInfo>
      </TextTipStyled>
      <SvgToolTip className="tip_svg" />
    </>
  );
};

export default TextTip;
