import { LogoStyled } from './Logo.styled';

const Logo = () => {
  return (
    <a
      href="https://dexola.com/"
      aria-label="official website dexola.com"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <LogoStyled />
    </a>
  );
};

export default Logo;
