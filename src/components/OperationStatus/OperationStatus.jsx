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
  const { symbol } = useContextContract();
  const { pathname } = useLocation();
  const [fetchStatus, setFetchStatus] = useState(false);
  const [operationData, setOperationData] = useState(null);

  const { dataOperation } = useContextContract();

  //? перевірка чи прийшов новий статус на цю сторінку
  const statusCheck = dataOperation.find(item => item.page === pathname) || dataOperation.find(item => item);
  // console.log('🚀 ~ statusCheck:', statusCheck);

  // return;
  // //? перевірка чи прийшла додаткова операція
  // const isNewStatus = dataOperation.find(item => item.status === CONTRACT_OPERATION.status.preLoading);
  // const isOldStatus = dataOperation.find(
  //   item => item.status === CONTRACT_OPERATION.status.error || item.status === CONTRACT_OPERATION.status.success
  // );
  // const clearOldStatus = isNewStatus && isOldStatus;

  useEffect(() => {
    if (!statusCheck || fetchStatus) return;
    setOperationData(statusCheck);
    if (
      statusCheck.status === CONTRACT_OPERATION.status.success ||
      statusCheck.status === CONTRACT_OPERATION.status.error
    ) {
      setFetchStatus(true);
    } else return;

    setTimeout(() => {
      setFetchStatus(false);
      setOperationData(null);
    }, 2000);
  }, [statusCheck, fetchStatus]);

  if (!operationData) return;

  const { status, valueOperation, operation } = operationData;

  return (
    <OperationStatusStyled $media={media}>
      {status !== CONTRACT_OPERATION.status.error ? (
        <>
          {status === CONTRACT_OPERATION.status.success ? <SvgSuccess /> : <SvgPending />}
          <OperationInfo>
            {CONTRACT_OPERATION[operation].statusText[status].first}{' '}
            <SpanStyled>
              {valueOperation} {symbol}
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
