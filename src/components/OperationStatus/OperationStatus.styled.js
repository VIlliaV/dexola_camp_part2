import styled from 'styled-components';
import { media } from '@/styles/media';
import { ReactComponent as operationPending } from '@/images/svg/operation_pending.svg';
import { ReactComponent as operationError } from '@/images/svg/operation_error.svg';
import { ReactComponent as operationSuccess } from '@/images/svg/operation_success.svg';

export const OperationStatusStyled = styled.div`
  flex: 1;
  justify-self: center;
  /* display: ${props => (props.$media === 'tablet' ? 'none' : 'flex')}; */
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 8px;
  @media ${media.tablet} {
    /* display: ${props => (props.$media === 'mobile' ? 'none' : 'flex')}; */
    align-self: end;
  }
  @media ${media.tabDesk} {
    align-items: end;
  }
`;

export const SvgPending = styled(operationPending)`
  & #indicator {
    /* fill: red; */
  }
  & #circle {
    /* stroke: red; */
  }
`;

export const SvgError = styled(operationError)`
  /* max-width: 50; */
  /* grid-row: span 2; */
`;

export const SvgSuccess = styled(operationSuccess)`
  /* fill: red;
  stroke: green; */
`;

export const OperationInfo = styled.p`
  /* display: inline-flex;
  align-items: baseline; */
  /* max-width: 36vh; */
  /* gap: 8px; */

  line-height: 1.71429;
  letter-spacing: normal;
  color: var(--primary);
  /* flex-wrap: wrap; */
  white-space: wrap;
  & br {
    @media ${media.tablet} {
      display: none;
    }
  }
`;

export const SpanStyled = styled.span`
  font-weight: 700;
`;
