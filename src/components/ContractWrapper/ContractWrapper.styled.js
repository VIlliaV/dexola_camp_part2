import styled from 'styled-components';
import { media } from '@/styles/media';

export const ContractWrapperStyled = styled.div`
  padding: 94px 0 48px;

  & .container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  & h1 {
    @media ${media.mobTab} {
      width: 75.73333vw;
    }
  }
  & .contract_info {
    display: flex;
    justify-content: start;
    gap: 20px;
    @media ${media.tablet} {
      gap: 24px;
    }
    @media ${media.desktop} {
      gap: 40px;
    }
  }

  & li {
    /* display: flex;
    align-items: baseline;
    height: auto; */
  }
`;
