import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  gap: 2px;

  & .with_out_bkg {
    background-color: transparent;
    &:hover,
    &:focus {
      background-color: var(--button_hover);
    }
  }
`;
