import { media } from '@/styles/media';
import background_header from '../../assets/images/background/technology_background.webp';
import background_header2x from '../../assets/images/background/technology_background@2x.webp';
import background_header_mob from '../../assets/images/background/technology_background_mob.webp';
import background_header_mob2x from '../../assets/images/background/technology_background_mob@2x.webp';

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
    background-size: 100% auto;
  }
  @media ${media.desktop + media.retina} {
    background-image: url(${background_header2x});
     background-size: 100% auto;
  }
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: top center;
`;

export const visualHidden = `
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);`;
