import styled from 'styled-components';
import { media } from '@/styles/media';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .my-background {
    background-image: url('image.webp');

    @supports (background-image: url('image.webp')) {
      background-image: url('image.webp');
    }

    background-image: url('image.png');
  }
  & main {
    flex: 1;
    margin-top: 49px;
    @media ${media.tablet} {
      margin-top: 59px;
    }
    @media ${media.desktop} {
      margin-top: 54px;
    }
  }
`;
