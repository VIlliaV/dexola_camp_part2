import { CONTRACT_OPERATION } from '../../constants/constants';

export const operationChangeStatus = ({
  prevData = [],
  status = null,
  isSuccess = false,
  isError = false,
  data = [],
  dataWaitTransaction = [],
  nameOPeration = null,
  isMoreOperation = false,
  path = null,
  nameOPerationNext = null,
  valueOperation = null,
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
    if (itemFirst && isError && item.hash === dataWaitTransaction?.transactionHash) {
      itemFirst = false;
      return { ...item, status: CONTRACT_OPERATION.status.error };
    }
    return item;
  });
  if (isMoreOperation && isSuccess === true) {
    arr.push({
      page: path,
      status: CONTRACT_OPERATION.status.preLoading,
      operation: nameOPerationNext,
      valueOperation,
    });
  }
  return arr;
};
