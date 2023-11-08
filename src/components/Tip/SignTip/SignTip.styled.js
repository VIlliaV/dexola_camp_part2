import styled from 'styled-components';
import { media } from '@/styles/media';

export const SignTipStyled = styled.div`
  position: relative;
  background-color: transparent;
  border: none;

  & .text_tip,
  & .backdrop,
  & .tip_svg {
    display: none;
  }
  &.active {
    @media ${media.mobTab}, ${media.tabDesk} {
      position: static;
    }
    & .text_tip,
    & .tip_svg {
      display: block;
    }
    & .backdrop {
      @media ${media.mobTab}, ${media.tabDesk} {
        display: block;
      }
    }
  }
`;
