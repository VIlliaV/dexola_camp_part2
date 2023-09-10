import styled from 'styled-components';
import { ReactComponent as Logo } from '@/images/svg/logo.svg';

export const LogoLink = styled.a`
  padding: 14px 0;
`;

export const LogoStyled = styled(Logo)`
  display: flex;
  fill: var(--primary);
`;
