import { useLocation } from 'react-router-dom';
import { useContextContract } from '../../Context';
import {
  OperationInfo,
  OperationStatusStyled,
  SpanStyled,
  SvgError,
  SvgPending,
  SvgSuccess,
} from './OperationStatus.styled';
import { useEffect } from 'react';

const OperationStatus = ({ media }) => {
  const unit = 'STRU';
  const { pathname } = useLocation();
  useEffect(() => {}, [pathname]);

  const { dataOperation } = useContextContract();

  const isStatus = dataOperation.find(option => option.page === pathname);

  if (!isStatus) return;
  const { status, valueOperation } = isStatus;
  // console.log('🚀 ~ status:', status);

  return (
    <OperationStatusStyled $media={media}>
      {status === 'loading' ? (
        <>
          <SvgPending />
          <OperationInfo>
            Adding{' '}
            <SpanStyled>
              {valueOperation} {unit}
            </SpanStyled>{' '}
            to Staking
          </OperationInfo>
        </>
      ) : status === 'success' ? (
        <>
          <SvgSuccess />
          <OperationInfo>
            <SpanStyled>
              {valueOperation} {unit}{' '}
            </SpanStyled>
            successfully <br />
            added to Staking
          </OperationInfo>
        </>
      ) : status === 'error' ? (
        <>
          <SvgError />
          <OperationInfo>
            <SpanStyled>Connection Error </SpanStyled>
            <br />
            Please try again
          </OperationInfo>
        </>
      ) : (
        <> </>
      )}
    </OperationStatusStyled>
  );
};

export default OperationStatus;
