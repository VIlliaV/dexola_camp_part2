import styled from 'styled-components';
import { media } from '@/styles/media';

export const WalletBalanceStyled = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  & img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;
    @media ${media.tablet} {
      width: 32px;
      height: 32px;
    }
  }
`;
