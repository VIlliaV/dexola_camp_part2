import { SvgLogoStyled } from '../../styles/styledConst/svgStyled';
import { LogoLink } from './Logo.styled';

const Logo = () => {
  return (
    <LogoLink
      href="https://dexola.com/"
      aria-label="official website dexola.com"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <SvgLogoStyled />
    </LogoLink>
  );
};

export default Logo;
