import { LogoLink, LogoStyled } from './Logo.styled';

const Logo = () => {
  return (
    <LogoLink
      href="https://dexola.com/"
      aria-label="official website dexola.com"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <LogoStyled />
    </LogoLink>
  );
};

export default Logo;
