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
import { removeOperation } from '../../utils/helpers/operation';

const OperationStatus = ({ media }) => {
  const { symbol } = useContextContract();
  const { pathname } = useLocation();
  const [fetchStatus, setFetchStatus] = useState(false);
  const [operationData, setOperationData] = useState(null);

  const { dataOperation, setDataOperation } = useContextContract();

  //? перевірка чи прийшов новий статус на цю сторінку
  const statusCheckArr = dataOperation.filter(item => item.pathname === pathname) || dataOperation.filter(item => item);
  const statusCheck =
    statusCheckArr.find(
      item => item.status === CONTRACT_OPERATION.status.success || item.status === CONTRACT_OPERATION.status.error
    ) || statusCheckArr.find(item => item);

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
      setDataOperation(prev => removeOperation({ id: statusCheck.id, prev }));
    }, 2000);
  }, [statusCheck, fetchStatus, setDataOperation]);

  if (!operationData) return;

  const { status, valueOperation, functionName } = operationData;

  return (
    <OperationStatusStyled $media={media}>
      {status !== CONTRACT_OPERATION.status.error ? (
        <>
          {status === CONTRACT_OPERATION.status.success ? <SvgSuccess /> : <SvgPending />}
          <OperationInfo>
            {CONTRACT_OPERATION[functionName].statusText[status].first}{' '}
            <SpanStyled>
              {valueOperation} {symbol}
            </SpanStyled>{' '}
            {status === CONTRACT_OPERATION.status.success && (
              <>
                successfully <br />
              </>
            )}
            {CONTRACT_OPERATION[functionName].statusText[status].second}
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
