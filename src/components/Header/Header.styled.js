import styled from 'styled-components';
import { media } from '@/styles/media';

export const HeaderContainer = styled.header`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding: 11px 40px;
  background-color: var(--background);
  z-index: 100;
  @media ${media.tablet} {
    padding: 15px 40px;
  }

  & button {
    @media ${media.mobTab} {
      padding: 10px 16px;
    }
  }
`;
