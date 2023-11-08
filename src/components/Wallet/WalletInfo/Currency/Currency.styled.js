import styled from 'styled-components';
import { media } from '@/styles/media';

export const CurrencyStyled = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary);
  background-color: transparent;
  border: none;

  & .wallet_address,
  span {
    @media ${media.mobTab} {
      display: none;
    }
  }
`;
