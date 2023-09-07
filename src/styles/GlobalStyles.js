import { createGlobalStyle } from 'styled-components';
import { media } from '@/styles/media';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: var(--font-body);
    font-size: var(--font-size_body-mob);

    @media ${media.tablet} {
      font-size: var(--font-size_body-tab);
    }

    @media ${media.desktop} {
      font-size: var(--font-size_body-web);
    }
     letter-spacing: -0.02em;
  }
  h1, h2, h3, h4,th {
    font-family: var(--font-title)
  }
  h1 {
    font-size: 120px;
    font-weight: 500;
    line-height: 1.254;
    text-transform: uppercase;
    letter-spacing: 0;

    @media ${media.tablet} {
      font-size: 280px;
    }

    @media ${media.desktop} {
      font-size: 340px;
    }

  }

  h2 {
     font-size: var(--font-size_title-mob);
    text-transform: capitalize;
    letter-spacing: 0;

    @media ${media.tablet} {
      font-size: var(--font-size_title-tab);
      
    }

    @media ${media.desktop} {
      font-size: var(--font-size_title-web);
      letter-spacing: -0.02em;
    }
  }
  h3,h4,th {
     font-size: var(--font-size_subtitle-mob);
     font-weight: 500;
    letter-spacing:-0.02em ;
   

    @media ${media.tablet} {
      font-size: var(--font-size_subtitle-tab);
    }

    @media ${media.desktop} {
      font-size: var(--font-size_subtitle-web);
      
    }
  }

  h4 {
    @media ${media.desktop} {
      font-size: var(--font-size_subtitle-web);
      letter-spacing: 0;
    line-height: 1.4;
    }
  }

  p {
  color: var(--secondary);
  }

  input {
    line-height: 1.333333; 
    letter-spacing: 0.02em;
  }




`;
