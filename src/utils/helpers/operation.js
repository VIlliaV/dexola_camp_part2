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
    if (status === 'error' && item.status === 'pre-loading' && item.operation === nameOPeration) {
      return { ...item, status: 'error' };
    }
    if (status === 'success' && item.status === 'pre-loading' && item.operation === nameOPeration) {
      return { ...item, status: 'loading', hash: data?.hash };
    }
    if (isSuccess && item.hash === dataWaitTransaction?.transactionHash) {
      return { ...item, status: 'success' };
    }
    if (isError && item.hash === dataWaitTransaction?.transactionHash) {
      return { ...item, status: 'error' };
    }
    return item;
  });
  if (isMoreOperation && isSuccess === true) {
    arr.push({ page: path, status: 'pre-loading', operation: nameOPerationNext, valueOperation });
  }
  return arr;
};

// function updateDataOperation(prevData, statusStake, isSuccessStake, isErrorStake, dataStake, dataWaitTransactionStake) {
//   return prevData.map(item => {
//     if (statusStake === 'error' && item.status === 'pre-loading' && item.operation === 'stake') {
//       return { ...item, status: 'error' };
//     }
//     if (statusStake === 'success' && item.status === 'pre-loading' && item.operation === 'stake') {
//       return { ...item, status: 'loading', hash: dataStake?.hash };
//     }
//     if (isSuccessStake && item.hash === dataWaitTransactionStake?.transactionHash) {
//       return { ...item, status: 'success' };
//     }
//     if (isErrorStake && item.hash === dataStake?.hash) {
//       return { ...item, status: 'error' };
//     }
//     return item;
//   });
// }
