import { useState } from 'react';
import Tip from '../TextTip/TextTip';
import { SignTipStyled } from './SignTip.styled';
// import Backdrop from '../../Backdrop/Backdrop';
import { SvgTip } from '../../../styles/styledConst/svgStyled';
import { BackdropStyled } from '../../../styles/styledConst/componentStyled';

const SignTip = ({ variable = {}, className = '' }) => {
  const [isActive, setIsActive] = useState(false);

  const { tip, text } = variable;
  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };
  const handleClick = () => {
    if (!isActive) {
      setIsActive(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
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
      onClick={handleClick}
      className={`${className}  ${isActive ? 'active' : ''}`}
    >
      <BackdropStyled className="backdrop" onClick={clearBackdrop} />
      <SvgTip />
      <Tip tip={tip} text={text} />
    </SignTipStyled>
  );
};

export default SignTip;
