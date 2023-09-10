import { SvgStyled, TextTipStyled } from './TextTip.styled';

const TextTip = ({ text = '' }) => {
  return (
    <TextTipStyled className="text_tip">
      <p>{text}</p>
      <SvgStyled />
    </TextTipStyled>
  );
};

export default TextTip;
