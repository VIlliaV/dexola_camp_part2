import styled from 'styled-components';
import { media } from '@/styles/media';
import { ReactComponent as operationPending } from '@/images/svg/operation_pending.svg';
import { ReactComponent as operationError } from '@/images/svg/operation_error.svg';
import { ReactComponent as operationSuccess } from '@/images/svg/operation_success.svg';
import { rotateAnimation, movingRightLeft } from '../../styles/animationConst.js';

export const OperationStatusStyled = styled.div`
  flex: 1;
  justify-self: center;
  display: ${props => (props.$media === 'tablet' ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 8px;
  animation: movingRightLeft 3s ease-in-out;
  ${movingRightLeft}

  @media ${media.tablet} {
    display: ${props => (props.$media === 'mobile' ? 'none' : 'flex')};
    align-self: end;
  }
  @media ${media.tabDesk} {
    align-items: end;
  }
`;

export const SvgPending = styled(operationPending)`
  border-radius: 50%;
  animation: rotate 1s linear infinite;

  & #indicator {
  }
  & #circle {
    stroke-width: 3px;
  }
  & #track {
    fill: #6e758b;
  }
  ${rotateAnimation}
`;

export const SvgError = styled(operationError)``;

export const SvgSuccess = styled(operationSuccess)``;

export const OperationInfo = styled.p`
  line-height: 1.71429;
  letter-spacing: normal;
  color: var(--primary);
  white-space: wrap;
`;

export const SpanStyled = styled.span`
  font-weight: 700;
`;
