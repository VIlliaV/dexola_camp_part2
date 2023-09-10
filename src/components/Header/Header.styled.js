import styled from 'styled-components';
import { media } from '@/styles/media';
import { headerBackground } from '../../styles/styledConst';

// import background_header from '../../images/background/technology_background.webp';
// import background_header2x from '../../images/background/technology_background@2x.webp';
// import background_header_mob from '../../images/background/technology_background_mob.webp';
// import background_header_mob2x from '../../images/background/technology_background_mob@2x.webp';

// export const background = `background-image: url(${background_header_mob});
//   @media ${media.mobile + media.retina} {
//     background-image: url(${background_header_mob2x});
//   }
//   @media ${media.desktop} {
//     background-image: url(${background_header});
//   }
//   @media ${media.desktop + media.retina} {
//     background-image: url(${background_header2x});
//   }
//   background-size: 100vw auto;
//   background-repeat: no-repeat;
//   background-position: top center;
// `;

export const HeaderContainer = styled.header`
  ${headerBackground}
`;

export const HeaderContainerNav = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding: 11px 40px;

  z-index: 100;
  ${headerBackground}
  @media ${media.tablet} {
    padding: 15px 40px;
  }
  & button {
    @media ${media.mobTab} {
      padding: 10px 16px;
    }
  }
`;
