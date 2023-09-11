import { SvgStyled, TextTipStyled, TipInfo, TipTitle } from './TextTip.styled';

const TextTip = ({ tip = '', text = '' }) => {
  return (
    <>
      <TextTipStyled className="text_tip">
        <TipTitle>{text}</TipTitle>
        <TipInfo>{tip}</TipInfo>
      </TextTipStyled>
      <SvgStyled className="tip_svg" />
    </>
  );
};

export default TextTip;
