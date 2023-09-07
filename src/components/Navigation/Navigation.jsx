import { NavStyled, StyledNavLink } from './Navigation.styled';

const Navigation = () => {
  return (
    <NavStyled>
      <ul>
        <li>
          <StyledNavLink to="/">Stake</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="withdraw">Withdraw</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="claim">Claim Rewards</StyledNavLink>
        </li>
      </ul>
    </NavStyled>
  );
};

export default Navigation;
