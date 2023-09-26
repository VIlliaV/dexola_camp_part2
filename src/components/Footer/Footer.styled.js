import styled from 'styled-components';
import { media, size } from '@/styles/media';

export const FooterContainer = styled.footer`
  border-top: 1px solid var(--accent);
  flex-grow: 0;

  @media ${media.mobTab} {
    background-color: var(--background);
  }

  & .container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 17px;

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
      width: ${size.desktop};
      margin: 0 auto;
      padding: 16px 40px 26px;
    }
  }
`;
