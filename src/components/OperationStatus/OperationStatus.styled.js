import styled from 'styled-components';
import { media } from '@/styles/media';
import { ReactComponent as operationPending } from '@/images/svg/operation_pending.svg';
import { ReactComponent as operationError } from '@/images/svg/operation_error.svg';
import { ReactComponent as operationSuccess } from '@/images/svg/operation_success.svg';

export const OperationStatusStyled = styled.div`
  flex: 1;
  justify-self: center;
  display: ${props => (props.$media === 'tablet' ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 8px;
  animation: popup 3s ease-in-out;
  @keyframes popup {
    from {
      transform: translateX(350px);
    }
    to {
      transform: translateX(0px);
    }
  }
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
  animation: rotateIndicator 1s linear infinite;

  & #indicator {
  }
  & #circle {
    stroke-width: 3px;
  }
  & #track {
    fill: #6e758b;
  }
  @keyframes rotateIndicator {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
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
