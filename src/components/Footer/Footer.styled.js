import styled from 'styled-components';
import { media } from '@/styles/media';

export const FooterContainer = styled.footer`
  border-top: 1px solid var(--accent);
  flex-grow: 0;
  & .container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 17px;
    /* height: 100%; */
    /* margin-top: 5px; */
    & p {
      font-size: 11px;
    }

    @media ${media.tablet} {
      padding-top: 16px;
      padding-bottom: 16px;
      & p {
        font-size: 14px;
      }
    }

    @media ${media.desktop} {
      width: 100vw;
      padding: 16px 40px 26px;
    }
  }
`;
