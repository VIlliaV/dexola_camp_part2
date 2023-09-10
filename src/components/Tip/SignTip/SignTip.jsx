import Tip from '../TextTip/TextTip';
import { SignTipStyled, SvgStyled } from './SignTip.styled';

const SignTip = ({ tip = '', className = '' }) => {
  return (
    <SignTipStyled className={className}>
      <SvgStyled />
      <Tip text={tip} />
    </SignTipStyled>
  );
};

export default SignTip;
