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
  fill: transparent;
  stroke: var(--primary);
`;
