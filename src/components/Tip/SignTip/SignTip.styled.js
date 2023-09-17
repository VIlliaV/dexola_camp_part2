import styled from 'styled-components';
import { media } from '@/styles/media';
import { ReactComponent as tipSvg } from '@/images/svg/help-circle.svg';

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

export const SvgStyled = styled(tipSvg)`
  width: 16.7px;
  height: 18.7px;
  margin-bottom: -6px;
  fill: transparent;
  stroke-width: 0.965px;
  stroke: var(--secondary);

  @media ${media.tablet} {
    width: 20px;
    height: 22px;
    stroke: var(--primary);
    stroke-width: 1.5px;
    margin-bottom: -6px;
  }
  @media ${media.desktop} {
    margin-left: -4px;
    width: 24px;
    height: 24px;
  }
`;
