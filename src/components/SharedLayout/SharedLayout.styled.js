import styled from 'styled-components';
import { media, padding } from '@/styles/media';

export const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & main {
    min-height: 100dvh;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    & .pages_section {
      height: 100%;
      & .container {
        height: 100%;
      }
    }
    /* margin-top: 49px; */
    @media ${media.tablet} {
      flex: 1;
    }
    @media ${media.desktop} {
      height: 100%;
      /* margin-top: 54px; */
    }
  }
`;

export const Pages = styled.div`
  position: relative;
  height: 100%;
  padding: 29px 0 56px;

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

  /* border-top: 1px solid var(--accent); */
  @media ${media.tablet} {
    padding: 32px 24px;
    border: 1px solid var(--accent);
    &::before {
      display: none;
    }
  }
`;

export const Ellipse = styled.div`
  display: none;
  @media ${media.desktop} {
    position: absolute;
    top: 57%;
    left: 50%;
    transform: translate(-50%, 0);
    display: block;
    width: 2193px;
    height: 1330px;
    /* flex-shrink: 0; */
    border-radius: 2193px;
    z-index: -1;
    background: radial-gradient(42.93% 42.93% at 50% 50%, #2f4bc9 0%, #080808 100%);
  }
`;
