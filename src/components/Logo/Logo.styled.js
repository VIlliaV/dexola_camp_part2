import styled from 'styled-components';
import { media } from '@/styles/media';
import { ReactComponent as Logo } from '@/images/svg/logo.svg';

export const LogoLink = styled.a`
  padding: 14px 0;
  @media ${media.mobTab} {
    padding: 10px 0px;
  }
`;

export const LogoStyled = styled(Logo)`
  display: flex;
  fill: var(--primary);
`;
