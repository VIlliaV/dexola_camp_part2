import styled from 'styled-components';
import { media, size, padding } from '@/styles/media';

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 ${padding.mobile}px;

  @media ${media.tablet} {
    width: ${size.tablet}px;
    padding: 0 ${padding.tablet}px;
  }
  @media ${media.desktop} {
    width: ${size.desktop}px;
    padding: 0 ${padding.desktop};
  }
`;
