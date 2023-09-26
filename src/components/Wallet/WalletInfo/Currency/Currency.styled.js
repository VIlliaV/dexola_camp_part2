import styled from 'styled-components';
import { media } from '@/styles/media';
import { ReactComponent as svgETH } from '@/images/svg/cryptocurrency-color_eth.svg';

export const CurrencyStyled = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary);
  background-color: transparent;
  border: none;

  & .wallet_address,
  span {
    @media ${media.mobTab} {
      display: none;
    }
  }
`;

export const SvgStyled = styled(svgETH)`
  width: 24px;
  height: 24px;
  @media ${media.tablet} {
    width: 32px;
    height: 32px;
  }
`;
