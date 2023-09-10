import styled from 'styled-components';
import { media } from '@/styles/media';

export const ContractInfoStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: baseline;
  gap: 4px;
  @media ${media.desktop} {
    grid-template-columns: repeat(3, auto);
    gap: 12px;
    & .contract_item {
      &:nth-child(2) {
        order: 3;
      }
    }
  }

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

  & .text_variable {
    color: var(--primary);
    font-size: 16px;
    line-height: normal;
  }
`;
