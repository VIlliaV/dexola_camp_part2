import styled from 'styled-components';
import { media, padding } from '@/styles/media';

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
    /* height: 100%; */
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    & .pages_section {
      height: 100%;
      & .container {
        height: 100%;
        display: flex;
        flex-direction: column;
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

export const Pages = styled.div`
  position: relative;
  height: 100%;
  padding: 29px 0px 56px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 1px;
    background-color: var(--accent);
    transform: translate(-${padding.mobile}px, 0);
  }

  @media ${media.tablet} {
    padding: 32px 24px;
    max-height: 100%;
    border: 1px solid var(--accent);
    &::before {
      display: none;
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
