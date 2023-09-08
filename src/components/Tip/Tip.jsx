import { SvgStyled, TipStyled } from './Tip.styled';

const Tip = ({ text = '' }) => {
  return (
    <TipStyled>
      <p>{text}</p>
      <SvgStyled />
    </TipStyled>
  );
};

export default Tip;
