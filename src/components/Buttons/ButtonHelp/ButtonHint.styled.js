import styled from 'styled-components';
import { ReactComponent as Hint } from '@/images/svg/help-circle.svg';

export const ButtonHintStyled = styled.button`
  background-color: transparent;
  border: none;
`;

export const SvgStyled = styled(Hint)`
  fill: transparent;
  stroke: var(--primary);
`;
