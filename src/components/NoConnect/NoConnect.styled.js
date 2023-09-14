import styled from 'styled-components';
import { media } from '@/styles/media';
import { ReactComponent as no_connect } from '@/images/svg/no_connect.svg';

export const NoConnectStyled = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const SvgStyled = styled(no_connect)`
  width: 24px;
  height: 24px;
  @media ${media.tablet} {
    width: 32px;
    height: 32px;
  }
`;
