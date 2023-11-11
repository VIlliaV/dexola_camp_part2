import { FooterSection, HeadContainerFooter } from './Footer.styled';

const Footer = () => {
  return (
    <FooterSection>
      <HeadContainerFooter>
        <p className="footer_item">Designed by Dexola - 2023</p>
        <p className="footer_item"> © All rights reserved</p>
      </HeadContainerFooter>
    </FooterSection>
  );
};

export default Footer;
