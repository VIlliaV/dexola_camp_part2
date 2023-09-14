import styled from 'styled-components';
import { media, padding } from '@/styles/media';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  & main {
    flex: 1;
    /* margin-top: 49px; */
    @media ${media.tablet} {
      /* margin-top: 59px; */
    }
    @media ${media.desktop} {
      /* margin-top: 54px; */
    }
  }
`;

export const Pages = styled.div`
  position: relative;
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
    border: 1px solid var(--accent);
    &::before {
      display: none;
    }
  }
`;
