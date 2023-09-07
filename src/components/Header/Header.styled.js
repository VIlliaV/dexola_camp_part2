import styled from 'styled-components';
import { media } from '@/styles/media';
import background_header from '../../images/background/technology_background.png';

export const HeaderContainer = styled.header`
  background: url(${background_header});
  background-size: auto 400px;
  background-repeat: no-repeat;
  background-position: top center;

  /* @supports (background-image: url(background_header)) {
    background-image: url(background_header);
  } */

  /* background-image: url(background_header); */
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
  /* background-color: var(--background); */
  z-index: 100;
  background: url(${background_header});
  background-size: auto 400px;
  background-repeat: no-repeat;
  background-position: top center;
  @media ${media.tablet} {
    padding: 15px 40px;
  }
  & button {
    @media ${media.mobTab} {
      padding: 10px 16px;
    }
  }
`;
