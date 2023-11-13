import { SvgToolTipStyled, TextTipStyled, TipInfo, TipTitle } from './TextTip.styled';

const TextTip = ({ tip = '', text = '', isShow, isActive }) => {
  return (
    <>
      <TextTipStyled $isShow={isShow} $active={isActive}>
        <TipTitle>{text}</TipTitle>
        <TipInfo>
          {tip.first}
          <br />
          {tip.second}
        </TipInfo>
      </TextTipStyled>
      <SvgToolTipStyled />
    </>
  );
};

export default TextTip;
