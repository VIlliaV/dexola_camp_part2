import { useState } from 'react';
import TextTip from '../TextTip/TextTip';
import { BackdropStyledTip, SignTipStyled } from './SignTip.styled';
import { SvgTip } from '../../../styles/styledConst/svgStyled';

const SignTip = ({ variable = {}, className = '' }) => {
  const [isActive, setIsActive] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const { tip, text } = variable;
  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };
  const handleClick = () => {
    if (!isActive) {
      setIsShow(true);
      setIsActive(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  const clearBackdrop = e => {
    if (e.target === e.currentTarget) {
      setIsShow(false);
      setTimeout(() => {
        setIsActive(false);
      }, 500);
    }
  };

  return (
    <SignTipStyled
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      $active={isActive}
      className={className}
    >
      <SvgTip />
      {isActive && (
        <>
          <BackdropStyledTip onClick={clearBackdrop} />
          <TextTip tip={tip} text={text} isShow={isShow} />
        </>
      )}
    </SignTipStyled>
  );
};

export default SignTip;
