import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { media } from '@/styles/media';

export const NavStyled = styled.nav`
  width: 100%;

  & ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media ${media.tablet} {
      justify-content: start;
    }
  }
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  padding: 16px 0px;
  justify-content: center;
  align-items: center;
  color: var(--secondary);

  @media ${media.tablet} {
    padding: 16px 32px;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: normal;
  }

  &.active {
    position: relative;
    color: var(--primary);
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 100%;
      height: 6px;
      background-color: var(--accent);
      transform: translate(-50%, 0);
      @media ${media.tablet} {
        height: 8px;
      }
    }
  }
`;
