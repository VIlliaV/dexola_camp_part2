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
import { useEffect, useState } from 'react';
import { CONTRACT_OPERATION } from '../../constants/constants';

const OperationStatus = ({ media }) => {
  const unit = 'STRU';
  const { pathname } = useLocation();
  const [clearStatus, setClearStatus] = useState(false);
  // useEffect(() => {}, [pathname]);

  const { dataOperation, setDataOperation, updateInfo, setUpdateInfo } = useContextContract();

  const isStatus = dataOperation.find(option => option.page === pathname);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClearStatus(true);
    }, 7000);
    return () => {
      clearTimeout(timer);
    };
  }, [isStatus]);

  useEffect(() => {
    setDataOperation(prev => {
      const index = prev.findIndex(
        item => item.status === CONTRACT_OPERATION.status.error || item.status === CONTRACT_OPERATION.status.success
      );
      if (index !== -1) {
        const arr = [...prev];
        arr.splice(index, 1);
        return arr;
      }
      return prev;
    });
    // }
    setClearStatus(false);
    if (updateInfo) setUpdateInfo(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearStatus]);

  if (!isStatus) return;
  const { status, valueOperation, operation } = isStatus;

  return (
    <OperationStatusStyled $media={media}>
      {status !== CONTRACT_OPERATION.status.error ? (
        <>
          {status === CONTRACT_OPERATION.status.success ? <SvgSuccess /> : <SvgPending />}
          <OperationInfo>
            {CONTRACT_OPERATION[operation].statusText[status].first}{' '}
            <SpanStyled>
              {valueOperation} {unit}
            </SpanStyled>{' '}
            {status === CONTRACT_OPERATION.status.success && (
              <>
                successfully <br />
              </>
            )}
            {CONTRACT_OPERATION[operation].statusText[status].second}
          </OperationInfo>
        </>
      ) : (
        <>
          <SvgError />
          <OperationInfo>
            <SpanStyled>Connection Error </SpanStyled>
            <br />
            Please try again
          </OperationInfo>
        </>
      )}
    </OperationStatusStyled>
  );
};

export default OperationStatus;
