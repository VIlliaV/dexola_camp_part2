import styled from 'styled-components';
import { media, size } from '@/styles/media';
import { headerBackground } from '../../styles/styledConst/styledConst';

export const HeaderContainer = styled.header`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding: 11px 40px;
  z-index: 100;
  ${headerBackground}

  @media ${media.mobTab} {
    padding: 3px 24px 22px;
  }

  @media ${media.tablet} {
    padding: 15px 40px;
  }
  @media ${media.desktop} {
    width: ${size.desktop}px;
    margin: 0 auto;
  }
  & button {
    @media ${media.mobTab} {
      padding: 8px 24px;
    }
  }
`;
