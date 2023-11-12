import styled from 'styled-components';
import Button from '../../components/Buttons/Button';

export const ButtonContainer = styled.div`
  display: flex;
  gap: 2px;
`;

export const ButtonWithdrawExit = styled(Button)`
  background-color: transparent;
  &:hover,
  &:focus {
    background-color: var(--button_hover);
  }
`;
