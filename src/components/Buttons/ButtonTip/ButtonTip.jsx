import Tip from '../../Tip/Tip';
import { ButtonTipStyled, SvgStyled } from './ButtonTip.styled';

const ButtonTip = ({ text = 'test \ntest for test' }) => {
  return (
    <ButtonTipStyled>
      <SvgStyled />
      <Tip text={text} />
    </ButtonTipStyled>
  );
};

export default ButtonTip;
