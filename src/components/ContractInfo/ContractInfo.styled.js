import styled from 'styled-components';
import { media } from '@/styles/media';

export const ContractInfoStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  gap: 4px;
  & .contract_item {
    &:nth-child(3) {
      grid-column: span 2;
    }
  }
  @media ${media.desktop} {
    grid-template-columns: repeat(3, auto);
    gap: 12px;
    & .contract_item {
      &:nth-child(2) {
        order: 3;
      }
      &:nth-child(3) {
        grid-column: span 1;
      }
    }
  }

  & .contract_data {
    display: flex;
    align-items: baseline;
    gap: 4px;
    @media ${media.tablet} {
      gap: 8px;
    }
  }
  & .contract_result {
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--primary);
    @media ${media.tablet} {
      font-size: 28px;
      line-height: 1.71429;
    }
    @media ${media.desktop} {
      font-size: 36px;
      line-height: 1.333333;
      letter-spacing: normal;
    }
  }
  & .contract_token_name {
    color: var(--primary);
    font-size: 12px;
    line-height: 1.66667;
    letter-spacing: normal;
    text-transform: uppercase;
    @media ${media.tablet} {
      font-size: 16px;
      line-height: 1.25;
    }
    @media ${media.desktop} {
      line-height: 3;
    }
  }

  & .text_variable {
    color: var(--primary);
    font-size: 12px;
    text-align: center;
    @media ${media.tablet} {
      font-size: 16px;
      text-align: start;
    }
  }
`;
