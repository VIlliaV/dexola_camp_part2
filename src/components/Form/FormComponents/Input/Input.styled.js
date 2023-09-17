import styled from 'styled-components';
import { media } from '@/styles/media';

export const InputStyled = styled.input`
  width: 100%;
  padding: 8px 0px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--primary);
  border-color: ${props => (props.$errorMessage ? 'var(--warning)' : 'var(--primary)')};

  &:focus {
    outline: none;
  }
  &:hover,
  &:focus-within {
    border-color: ${props => (props.$errorMessage ? 'var(--warning)' : 'var(--accent)')};
  }
  @media ${media.desktop} {
    padding: 8px 0px 8px 30px;
    letter-spacing: 0.02em;
    line-height: 1.333333;
  }
`;
