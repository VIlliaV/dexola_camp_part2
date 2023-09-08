import styled from 'styled-components';
import { ReactComponent as tipSvg } from '@/images/svg/help-circle.svg';

export const ButtonTipStyled = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
`;

export const SvgStyled = styled(tipSvg)`
  fill: transparent;
  stroke: var(--primary);
`;
