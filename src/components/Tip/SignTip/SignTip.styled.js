import styled from 'styled-components';
import { ReactComponent as tipSvg } from '@/images/svg/help-circle.svg';

export const SignTipStyled = styled.div`
  position: relative;
  background-color: transparent;
  border: none;

  & .text_tip {
    display: none;
  }
  &:hover .text_tip {
    display: block;
  }
`;

export const SvgStyled = styled(tipSvg)`
  margin-bottom: -6px;
  margin-left: -4px;
  fill: transparent;
  stroke: var(--primary);
  stroke-width: 1.5px;
`;
