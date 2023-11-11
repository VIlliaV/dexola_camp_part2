import styled from 'styled-components';
import Button from '../../components/Buttons/Button';
// import { ButtonStyle } from '../../components/Buttons/Button.styled';

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
