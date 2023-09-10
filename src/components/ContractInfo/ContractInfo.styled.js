import styled from 'styled-components';

export const ContractInfoStyled = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;

  & .contract_data {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }
  & .contract_result {
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 1.333333;
    text-transform: uppercase;
    letter-spacing: normal;
    color: var(--primary);
  }
  & .contract_token_name {
    color: var(--primary);

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 3;
    letter-spacing: normal;
    text-transform: uppercase;
  }

  & .contract_variable {
    display: flex;
    gap: 8px;
  }

  & .text_variable {
    color: var(--primary);
    font-size: 16px;
    line-height: normal;
  }
`;
