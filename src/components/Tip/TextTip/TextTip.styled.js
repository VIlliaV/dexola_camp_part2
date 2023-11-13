import styled from 'styled-components';
import { media } from '@/styles/media';
import { slideInAnimation, slideOutAnimation } from '../../../styles/styledConst/animationConst';
import { SignTipStyled } from '../SignTip/SignTip.styled';
import { SvgToolTip } from '../../../styles/styledConst/svgStyled';

export const TextTipStyled = styled.div`
  display: ${props => (props.$active ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px 12px;
  background-color: var(--primary);
  left: 0;
  z-index: 10001;

  @media ${media.mobTab}, ${media.tabDesk} {
    bottom: 0;
    width: 100vw;
    height: 275px;
    padding: 24px 16px 0px;
    border-radius: 8px 8px 0px 0px;
    animation: ${props => (props.$isShow ? slideInAnimation : slideOutAnimation)} 0.5s var(--cubic-bezier) 1;
    &::after {
      content: '';
      position: absolute;
      transform: translate(-50%, 0);
      top: 8px;
      left: 50%;
      width: 36px;
      height: 5px;
      border-radius: 2.5px;
      background-color: rgba(60, 60, 67, 0.3);
    }
  }
  @media ${media.tabDesk} {
    height: 100%;
    top: 50vh;
  }

  @media ${media.desktop} {
    display: none;
    ${SignTipStyled}:hover & {
      display: inline-block;
      top: -5px;
      left: 50%;
      transform: translate(-50%, -100%);
    }
  }

  text-align: center;
`;

export const TipTitle = styled.p`
  display: none;
  @media ${media.mobTab}, ${media.tabDesk} {
    display: block;
    color: rgba(0, 0, 0, 0.8);
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 16px;
  }
`;

export const TipInfo = styled.p`
  color: rgba(0, 0, 0, 0.8);
  font-family: var(--font-tip);
  font-size: 14px;
  line-height: 1.14286;
  text-align: start;
  letter-spacing: normal;
  white-space: pre;

  @media ${media.mobTab} {
    white-space: wrap;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
`;

export const SvgToolTipStyled = styled(SvgToolTip)`
  display: none;
  ${SignTipStyled}:hover & {
    @media ${media.desktop} {
      display: block;
    }
  }
`;
