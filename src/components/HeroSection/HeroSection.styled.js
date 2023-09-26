import styled from 'styled-components';
import { media } from '@/styles/media';
import { headerBackground } from '../../styles/styledConst';

export const HeroSectionStyled = styled.div`
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

    @media ${media.mobTab} {
      justify-content: space-between;
    }
    @media ${media.tablet} {
      gap: 24px;
    }
    @media ${media.desktop} {
      gap: 40px;
    }
  }
`;
