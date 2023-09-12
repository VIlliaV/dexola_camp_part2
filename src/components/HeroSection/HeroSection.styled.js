import styled from 'styled-components';
import { media } from '@/styles/media';
import { headerBackground } from '../../styles/styledConst';

export const HeroSectionStyled = styled.div`
  /* padding: 94px 0 48px; 65 102*/

  & .section {
    position: static;
    padding-top: 65px;
    ${headerBackground}
    @media ${media.tablet} {
      padding-top: 102px;
    }
    @media ${media.desktop} {
      padding-top: 94px;
    }
  }
  & .container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  & h1 {
    @media ${media.mobTab} {
      width: 75.73333vw;
    }
  }
  & .contract_info {
    display: flex;
    justify-content: start;
    gap: 20px;

    @media ${media.tablet} {
      gap: 24px;
    }
    @media ${media.desktop} {
      gap: 40px;
    }
  }

  & li {
    /* display: flex;
    align-items: baseline;
    height: auto; */
  }
`;
