import styled from 'styled-components';
import { media } from '@/styles/media';
import { headerBackground } from '../../styles/styledConst';

export const HeaderContainer = styled.header`
  ${headerBackground}
`;

export const HeaderContainerNav = styled.div`
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
  @media ${media.tablet} {
    padding: 15px 40px;
  }
  & button {
    @media ${media.mobTab} {
      padding: 10px 16px;
    }
  }
`;
