import { ReactComponent as svgETH } from '@/images/svg/cryptocurrency-color_eth.svg';

import styled from 'styled-components';

export const CurrencyStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  &:hover {
    border-radius: 4px;
    background-color: var(--button_hover);
  }
`;

export const SvgStyled = styled(svgETH)`
  /* fill: transparent;
  stroke: var(--primary); */
`;
