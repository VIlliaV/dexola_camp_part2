import styled from 'styled-components';
import { media } from '@/styles/media';
import { ReactComponent as no_connect } from '@/images/svg/no_connect.svg';

export const NoConnectStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: center;
  height: 100%;

  @media ${media.tablet} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
  }

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
        & br {
          display: none;
        }
      }
    }
    @media ${media.tablet} {
      padding-top: 0;
    }
  }

  & button {
    @media ${media.mobTab} {
      margin-top: 16px;
      margin-bottom: 56px;
    }
  }
`;

export const SvgStyled = styled(no_connect)``;
