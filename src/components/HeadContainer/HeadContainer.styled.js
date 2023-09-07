import styled from 'styled-components';
import { media, size } from '@/styles/media';

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 24px;

  @media ${media.tablet} {
    width: ${size.tablet}px;
    padding: 0 48px;
  }
  @media ${media.desktop} {
    width: ${size.desktop}px;
    padding: 0 120px;
  }
`;
