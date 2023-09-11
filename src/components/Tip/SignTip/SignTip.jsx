import { useState } from 'react';
import Tip from '../TextTip/TextTip';
import { SignTipStyled, SvgStyled } from './SignTip.styled';
import Backdrop from '../../Backdrop/Backdrop';

const SignTip = ({ variable = {}, className = '' }) => {
  const [isActive, setIsActive] = useState(false);
  const { tip, text } = variable;
  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };
  const clearBackdrop = e => {
    if (e.target === e.currentTarget) {
      setIsActive(false);
    }
  };
  return (
    <SignTipStyled
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${className}  ${isActive ? 'active' : ''}`}
    >
      <Backdrop className="backdrop" onClick={clearBackdrop} />
      <SvgStyled />
      <Tip tip={tip} text={text} />
    </SignTipStyled>
  );
};

export default SignTip;
