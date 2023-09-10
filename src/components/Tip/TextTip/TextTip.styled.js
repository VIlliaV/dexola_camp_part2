import styled from 'styled-components';
import { ReactComponent as toolTip } from '@/images/svg/tooltip.svg';

export const TextTipStyled = styled.div`
  position: absolute;
  top: 2.5px;
  left: 50%;
  transform: translate(-50%, -100%);
  display: inline-block;
  text-align: center;
  & p {
    padding: 8px 12px;
    color: rgba(0, 0, 0, 0.8);
    background-color: var(--primary);
    margin-bottom: -15px;
    font-family: var(--font-tip);
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
`;
