import styled from 'styled-components';
import { wallet } from '../../styles/styledConst';

export const WalletWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  /* gap: 24px; */

  & p {
    ${wallet}
  }
`;
