import styled from 'styled-components';
import { media } from '@/styles/media';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;

  @media ${media.mobTab} {
    min-height: 100vw;
    height: 100dvh;
  }
  @media ${media.desktop} {
    /* overflow: hidden; */
  }
  & main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    & .pages_section {
      /* height: 100%; */
      @media ${media.tablet} {
        padding-bottom: 16px;
      }
      @media ${media.desktop} {
        padding-bottom: 0px;
      }
    }

    @media ${media.mobTab} {
      min-height: 100dvh;
    }
    @media ${media.tablet} {
      flex: 1;
    }
  }
`;

export const Ellipse = styled.div`
  display: none;
  @media ${media.desktop} {
    display: block;
    position: absolute;
    top: 57vh;
    width: 100vw;
    bottom: 0;
    z-index: -1;
    overflow: hidden;
    background: radial-gradient(42.93% 42.93% at 50% 50%, #2f4bc9 0%, #080808 100%);
    background-size: 2193px 1330px;
    background-repeat: no-repeat;
    background-position: center top;
  }
`;
