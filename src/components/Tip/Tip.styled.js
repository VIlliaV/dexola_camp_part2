import styled from 'styled-components';
import { ReactComponent as toolTip } from '@/images/svg/tooltip.svg';

export const TipStyled = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  display: inline-block;

  & p {
    padding: 8px 12px;
    color: rgba(0, 0, 0, 0.8);
    background-color: var(--primary);
    margin-bottom: -11px;
    /* display: inline-block; */

    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.14286;
    text-align: start;
    white-space: pre;
  }
`;

export const SvgStyled = styled(toolTip)`
  fill: var(--primary);
  /* width: 16px;
  height: 6px; */
`;
