import styled from 'styled-components';
import { media, padding } from '@/styles/media';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  & main {
    height: 100vh;
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
