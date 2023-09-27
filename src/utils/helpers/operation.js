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
  const arr = prevData.map(item => {
    if (
      status === CONTRACT_OPERATION.status.error &&
      item.status === CONTRACT_OPERATION.status.preLoading &&
      item.operation === nameOPeration
    ) {
      return { ...item, status: CONTRACT_OPERATION.status.error };
    }
    if (
      status === CONTRACT_OPERATION.status.success &&
      item.status === CONTRACT_OPERATION.status.preLoading &&
      item.operation === nameOPeration
    ) {
      return { ...item, status: CONTRACT_OPERATION.status.loading, hash: data?.hash };
    }
    if (isSuccess && item.hash === dataWaitTransaction?.transactionHash) {
      return { ...item, status: CONTRACT_OPERATION.status.success };
    }
    if (isError && item.hash === dataWaitTransaction?.transactionHash) {
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
