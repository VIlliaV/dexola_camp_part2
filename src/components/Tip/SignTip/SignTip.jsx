import Tip from '../TextTip/TextTip';
import { SignTipStyled, SvgStyled } from './SignTip.styled';

const SignTip = ({ tip = '' }) => {
  return (
    <SignTipStyled>
      <SvgStyled />
      <Tip text={tip} />
    </SignTipStyled>
  );
};

export default SignTip;
