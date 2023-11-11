import styled from 'styled-components';
import { SvgPending } from '../../styles/styledConst/svgStyled';

export const FallBackStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SvgPendingFallBack = styled(SvgPending)`
  width: 200px;
  height: 200px;
`;
