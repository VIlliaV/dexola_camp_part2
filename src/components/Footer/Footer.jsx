import HeadContainer from '../HeadContainer/HeadContainer';
import { FooterContainer } from './Footer.styled';

const Footer = () => {
  return (
    <FooterContainer>
      <HeadContainer>
        <p className="footer_item">Designed by Dexola - 2023</p>
        <p className="footer_item"> © All rights reserved</p>
      </HeadContainer>
    </FooterContainer>
  );
};

export default Footer;
