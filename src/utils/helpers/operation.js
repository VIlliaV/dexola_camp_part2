import { CONTRACT_OPERATION } from '../../constants/constants';

export const operationChangeStatus = ({
  prevData = [],
  status = null,
  isSuccess = false,
  isError = false,
  data = [],
  dataWaitTransaction = [],
  nameOPeration = null,
}) => {
  let itemFirst = true;

  const arr = prevData.map(item => {
    if (
      itemFirst &&
      status === CONTRACT_OPERATION.status.error &&
      item.status === CONTRACT_OPERATION.status.preLoading &&
      item.operation === nameOPeration
    ) {
      itemFirst = false;
      return { ...item, status: CONTRACT_OPERATION.status.error };
    }
    if (itemFirst && isError && item.hash === prevData[0]?.hash) {
      itemFirst = false;
      return { ...item, status: CONTRACT_OPERATION.status.error };
    }

    if (
      itemFirst &&
      status === CONTRACT_OPERATION.status.success &&
      item.status === CONTRACT_OPERATION.status.preLoading &&
      item.operation === nameOPeration
    ) {
      itemFirst = false;
      return { ...item, status: CONTRACT_OPERATION.status.loading, hash: data?.hash };
    }
    if (itemFirst && isSuccess && item.hash === dataWaitTransaction?.transactionHash) {
      itemFirst = false;
      return { ...item, status: CONTRACT_OPERATION.status.success };
    }

    return item;
  });

  return arr;
};
