import styled from 'styled-components';
import { media } from '@/styles/media';

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
  @media ${media.tablet} {
    gap: 16px;
  }
`;
