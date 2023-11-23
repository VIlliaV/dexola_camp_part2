import { useLocation } from 'react-router-dom';
import { useContextContract } from '../../Context';
import { OperationInfo, OperationStatusStyled, SpanStyled } from './OperationStatus.styled';
import { useEffect, useState } from 'react';
import { CONTRACT_OPERATION } from '../../constants/constants';
import { removeOperation } from '../../utils/helpers/operation';
import { SvgError, SvgPending, SvgSuccess } from '../../styles/styledConst/svgStyled';
import { useContractReadData } from '../../utils/hooks/ContractHooks/useCustomContractRead';

const OperationStatus = ({ media }) => {
  const { symbol } = useContextContract();
  const { availableRewards } = useContractReadData({});
  const { pathname } = useLocation();
  const [fetchStatus, setFetchStatus] = useState(false);
  const [dataOperationItem, setDataOperationItem] = useState(null);
  const { dataOperation, setDataOperation } = useContextContract();
  const { claimReward } = CONTRACT_OPERATION;
  const { success, error } = CONTRACT_OPERATION.status;

  const findFetchedStatus = dataOperation.filter(item => item.status === success || item.status === error);
  const filterFetchedOrLoading = findFetchedStatus.length
    ? findFetchedStatus
    : dataOperation.filter((_, index) => index === dataOperation.length - 1);

  const displayOperationData =
    filterFetchedOrLoading.find(item => item.pathname === pathname) || filterFetchedOrLoading.find(item => item);

  useEffect(() => {
    if (!displayOperationData || fetchStatus) return;
    setDataOperationItem(displayOperationData);
    if (displayOperationData.status === success || displayOperationData.status === error) {
      setFetchStatus(true);
    } else return;

    setTimeout(() => {
      setFetchStatus(false);
      setDataOperationItem(null);
      setDataOperation(prev => removeOperation({ id: displayOperationData.id, prev }));
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayOperationData, fetchStatus, setDataOperation]);

  if (!dataOperationItem) return;

  const { status, valueOperation, functionName } = dataOperationItem;
  if (!availableRewards && functionName === claimReward.functionName) return;
  const { statusText } = CONTRACT_OPERATION[functionName];
  const valueDisplay = functionName === claimReward.functionName ? availableRewards : valueOperation;

  let svgStatus;
  switch (status) {
    case success:
      svgStatus = <SvgSuccess />;
      break;
    case error:
      svgStatus = <SvgError />;
      break;
    default:
      svgStatus = <SvgPending />;
  }

  return (
    <OperationStatusStyled $media={media}>
      <>
        {svgStatus}
        <OperationInfo>
          {statusText[status].first}{' '}
          <SpanStyled>{status === error ? 'Connection Error' : valueDisplay + ' ' + symbol}</SpanStyled>{' '}
          {status === success && 'successfully'} <br />
          {statusText[status].second}
        </OperationInfo>
      </>
    </OperationStatusStyled>
  );
};

export default OperationStatus;
