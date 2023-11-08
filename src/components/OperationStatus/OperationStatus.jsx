import { useLocation } from 'react-router-dom';
import { useContextContract } from '../../Context';
import { OperationInfo, OperationStatusStyled, SpanStyled } from './OperationStatus.styled';
import { useEffect, useState } from 'react';
import { CONTRACT_OPERATION } from '../../constants/constants';
import { removeOperation } from '../../utils/helpers/operation';
import { SvgError, SvgPending, SvgSuccess } from '../../styles/styledConst/svgStyled';

const OperationStatus = ({ media }) => {
  const { symbol } = useContextContract();
  const { pathname } = useLocation();
  const [fetchStatus, setFetchStatus] = useState(false);
  const [operationData, setOperationData] = useState(null);

  const { dataOperation, setDataOperation } = useContextContract();

  const findFetchedStatus = dataOperation.filter(
    item => item.status === CONTRACT_OPERATION.status.success || item.status === CONTRACT_OPERATION.status.error
  );
  const filterFetchedOrLoading = findFetchedStatus.length
    ? findFetchedStatus
    : dataOperation.filter((item, index) => index === dataOperation.length - 1);

  const displayOperationData =
    filterFetchedOrLoading.find(item => item.pathname === pathname) || filterFetchedOrLoading.find(item => item);

  useEffect(() => {
    if (!displayOperationData || fetchStatus) return;
    setOperationData(displayOperationData);
    if (
      displayOperationData.status === CONTRACT_OPERATION.status.success ||
      displayOperationData.status === CONTRACT_OPERATION.status.error
    ) {
      setFetchStatus(true);
    } else return;

    setTimeout(() => {
      setFetchStatus(false);
      setOperationData(null);
      setDataOperation(prev => removeOperation({ id: displayOperationData.id, prev }));
    }, 3000);
  }, [displayOperationData, fetchStatus, setDataOperation]);

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
