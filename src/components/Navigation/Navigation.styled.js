import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

export const NavStyled = styled.nav`
  width: 100%;

  & ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const StyledNavLink = styled(NavLink)`
  &.active {
    /* color: #fff; */
  }
`;
