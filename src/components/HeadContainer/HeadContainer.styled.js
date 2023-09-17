import styled from 'styled-components';
import { media, size, padding } from '@/styles/media';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 ${padding.mobile}px;

  @media ${media.tablet} {
    padding: 0 ${padding.tablet}px;
  }
  @media ${media.desktop} {
    width: ${size.desktop}px;
    padding: 0 ${padding.desktop}px;
  }
`;
