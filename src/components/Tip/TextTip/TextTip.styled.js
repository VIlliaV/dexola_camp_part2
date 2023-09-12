import styled from 'styled-components';
import { media } from '@/styles/media';
import { ReactComponent as toolTip } from '@/images/svg/tooltip.svg';

export const TextTipStyled = styled.div`
  position: absolute;
  padding: 8px 12px;
  background-color: var(--primary);
  left: 0;
  z-index: 10001;

  @media ${media.mobTab} {
    bottom: 0;
    width: 100vw;
    height: 275px;
    padding: 24px 16px 0px;
    border-radius: 8px 8px 0px 0px;
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

  @media ${media.tablet} {
    top: -5px;
    left: 50%;
    transform: translate(-50%, -100%);
  }
  display: inline-block;
  text-align: center;
`;

export const TipTitle = styled.p`
  display: none;
  @media ${media.mobTab} {
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

export const SvgStyled = styled(toolTip)`
  position: absolute;
  top: 1px;
  left: 0;
  transform: translate(0, -100%);
  fill: var(--primary);
`;
