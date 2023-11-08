import styled from 'styled-components';
import { media } from '@/styles/media';
import { ReactComponent as svgAvaETH } from '../../images/svg/cryptocurrency-color_eth.svg';
import { ReactComponent as svgTip } from '@/images/svg/help-circle.svg';
import { ReactComponent as svgToolTip } from '@/images/svg/tooltip.svg';
import { ReactComponent as svgNoConnect } from '@/images/svg/no_connect.svg';
import { ReactComponent as svgLogo } from '@/images/svg/logo.svg';
import { ReactComponent as svgPending } from '@/images/svg/operation_pending.svg';
import { ReactComponent as svgError } from '@/images/svg/operation_error.svg';
import { ReactComponent as svgSuccess } from '@/images/svg/operation_success.svg';
import { rotateAnimation } from './animationConst';

export const SvgAvatarETH = styled(svgAvaETH)`
  width: 24px;
  height: 24px;
  @media ${media.tablet} {
    width: 32px;
    height: 32px;
  }
`;

export const SvgTip = styled(svgTip)`
  width: 16.7px;
  height: 18.7px;
  margin-bottom: -6px;
  fill: transparent;
  stroke-width: 0.965px;
  stroke: var(--secondary);

  @media ${media.tablet} {
    width: 20px;
    height: 22px;
    stroke: var(--primary);
    stroke-width: 1.5px;
    margin-bottom: -6px;
  }
  @media ${media.desktop} {
    margin-left: -4px;
    width: 24px;
    height: 24px;
  }
`;

export const SvgToolTip = styled(svgToolTip)`
  position: absolute;
  top: 1px;
  left: 0;
  transform: translate(0, -100%);
  fill: var(--primary);
`;

export const SvgNoConnect = styled(svgNoConnect)``;

export const SvgLogoStyled = styled(svgLogo)`
  display: flex;
  fill: var(--primary);
`;

export const SvgPending = styled(svgPending)`
  border-radius: 50%;
  animation: rotate 1s linear infinite;

  & #indicator {
  }
  & #circle {
    stroke-width: 3px;
  }
  & #track {
    fill: #6e758b;
  }
  ${rotateAnimation}
`;

export const SvgError = styled(svgError)``;

export const SvgSuccess = styled(svgSuccess)``;
