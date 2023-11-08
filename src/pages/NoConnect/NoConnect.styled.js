import styled from 'styled-components';
import { media } from '@/styles/media';
import { PagesContainer } from '../Pages.styled';

export const NoConnectStyled = styled(PagesContainer)`
  align-items: center;
  justify-content: center;

  & .no_connect_info {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 16px;
    & p {
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
      @media ${media.tablet} {
        line-height: 1.5;
        letter-spacing: normal;
      }
    }
    @media ${media.tablet} {
      padding-top: 0;
    }
  }
  & button {
    align-self: center;
  }
`;
