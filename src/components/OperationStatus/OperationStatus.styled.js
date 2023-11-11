import styled from 'styled-components';
import { media } from '@/styles/media';
import { movingRightLeft } from '../../styles/styledConst/animationConst.js';

export const OperationStatusStyled = styled.div`
  flex: 1;
  justify-self: center;
  display: ${props => (props.$media === 'tablet' ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 8px;
  animation: ${movingRightLeft} 3s var(--cubic-bezier);

  @media ${media.tablet} {
    display: ${props => (props.$media === 'mobile' ? 'none' : 'flex')};
    align-self: end;
  }
  @media ${media.tabDesk} {
    align-items: end;
  }
`;

export const OperationInfo = styled.p`
  line-height: 1.71429;
  letter-spacing: normal;
  color: var(--primary);
  white-space: wrap;
`;

export const SpanStyled = styled.span`
  font-weight: 700;
`;
