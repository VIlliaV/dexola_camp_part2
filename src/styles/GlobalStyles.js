import { createGlobalStyle } from 'styled-components';
import { media } from '@/styles/media';
import background_header_mob from '@/images/background/technology_background_mob.webp';
import background_header_mob2x from '@/images/background/technology_background_mob@2x.webp';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: var(--font-body);
    font-size: var(--font-size_body-mob);
    letter-spacing: -0.02em;
     background-image: url(${background_header_mob});
     @media ${media.mobile + media.retina} {
    background-image: url(${background_header_mob2x});
     }
    @media ${media.tablet} {
      font-size: var(--font-size_body-tab);
      background: none;
       background-color: var(--background);
    }
    @media ${media.desktop} {

      font-size: var(--font-size_body-web);
    }

  }
  h1, h2, h3 {
    font-family: var(--font-title);
    font-style: normal;

  }
  h1 {
    font-size: 28px; 
    font-weight: 500;
    line-height: 1.205;
    letter-spacing: normal;
    @media ${media.tablet} {
     font-size: 40px;
     line-height: 1.4;
    }
    @media ${media.desktop} {
      font-size: 48px;
      
    }

  }

  h2 {
    font-size: var(--font-size_title-mob);
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.02em;
    @media ${media.tablet} {
      font-size: var(--font-size_title-tab);
    }
    @media ${media.desktop} {
      font-size: var(--font-size_title-web);   
    }
  }
  h3 {
    font-size: var(--font-size_subtitle-mob);
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    @media ${media.tablet} {
      font-size: var(--font-size_subtitle-tab);
      font-weight: 600;
      line-height: 1.14286; 
      letter-spacing: normal;
    }
    @media ${media.desktop} {
      font-size: var(--font-size_subtitle-web);     
    }
  }

  p {
  color: var(--secondary);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  }

  input {
    font-weight: 500;
    line-height: 1.71429; 
    letter-spacing: 0.02em;
    color: var(--primary);
       &::placeholder {
        font-weight: 400;
        color: var(--secondary);
       }

    @media ${media.tablet} {
    line-height: 1.5; 
    }
    @media ${media.desktop} {  
    font-weight: 700;
    }
  }

  .mobile{
   @media ${media.tablet} {  
    display: none;
    }

  }

  .tablet{
   @media ${media.mobTab} {  
    display: none;
    }
  @media ${media.desktop} {  
    display: none;
    }
  }

  .desktop{
   @media ${media.mobTab} {  
    display: none;
    }
  @media ${media.tabDesk} {  
    display: none;
    }
  }
    & br {
    @media ${media.tablet} {
      display: none;
    }
  }
`;
