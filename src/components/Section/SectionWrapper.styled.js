import styled from 'styled-components';
import { media } from '@/styles/media';

export const SectionStyled = styled.section`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px 0 24px;

  @media ${media.tablet} {
    padding: 43px 0 32px;
  }
  @media ${media.desktop} {
    padding: 40px 0 48px;
  }
`;
