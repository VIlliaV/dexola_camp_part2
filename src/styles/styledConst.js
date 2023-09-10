export const visualHidden = `
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);`;

export const wallet = `
   color: var(--primary);
    font-family: var(--font-title);
    font-size: 14px;
    font-weight: 600;
    line-height: 1.14286;
    letter-spacing: normal;
    text-transform: uppercase;

`;

import { media } from '@/styles/media';
import background_header from '@/images/background/technology_background.webp';
import background_header2x from '@/images/background/technology_background@2x.webp';
import background_header_mob from '@/images/background/technology_background_mob.webp';
import background_header_mob2x from '@/images/background/technology_background_mob@2x.webp';

export const headerBackground = `background-image: url(${background_header_mob});
  @media ${media.mobile + media.retina} {
    background-image: url(${background_header_mob2x});
  }
  @media ${media.tablet} {
    background-image: url(${background_header});
    background-size: auto;
  }
  @media ${media.tablet + media.retina} {
    background-image: url(${background_header2x});
     background-size: auto;
  }
    @media ${media.desktop} {
    background-image: url(${background_header});
    background-size: 100vw auto;
  }
  @media ${media.desktop + media.retina} {
    background-image: url(${background_header2x});
     background-size: 100vw auto;
  }
  background-size: 100vw auto;
  background-repeat: no-repeat;
  background-position: top center;
`;
