import { CONTRACT_OPERATION } from '../../constants/constants';

export const operationChangeStatus = ({
  prevData = [],
  status = null,
  isSuccess = false,
  isError = false,
  data = [],
  dataWaitTransaction = [],
  nameOPeration = null,
  valueOperation = null,
}) => {
  let itemFirst = true;
  const value =
    nameOPeration === CONTRACT_OPERATION.withdrawAll.operation ? valueOperation + ' + ALL Rewards' : valueOperation;
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
      return { ...item, status: CONTRACT_OPERATION.status.success, valueOperation: value };
    }

    return item;
  });

  return arr;
};

export const addOperation = ({
  prev,
  page = '/',
  status = CONTRACT_OPERATION.status.loading,
  valueOperation = null,
  operation,
}) => {
  const arr = [
    ...prev,
    {
      page,
      status,
      valueOperation,
      operation,
    },
  ];
  return arr;
};

export const operationChangeStatusTest = ({
  page = '/',
  prevData = [],
  status = null,
  isSuccess = false,
  isError = false,
  data = [],
  dataWaitTransaction = [],
  operation = null,
}) => {
  const indexOperation = prevData.findIndex(
    item => item.page === page && item.status === CONTRACT_OPERATION.status.preLoading && item.operation === operation
  );
  const arr = [...prevData];
  arr[indexOperation];
  if (
    status === CONTRACT_OPERATION.status.error &&
    arr[indexOperation].status === CONTRACT_OPERATION.status.preLoading
  ) {
    arr[indexOperation] = { ...arr[indexOperation], status: CONTRACT_OPERATION.status.error };
  }
  if (isError && arr[indexOperation].hash === prevData[0]?.hash) {
    arr[indexOperation] = { ...arr[indexOperation], status: CONTRACT_OPERATION.status.error };
  }

  if (
    status === CONTRACT_OPERATION.status.success &&
    arr[indexOperation].status === CONTRACT_OPERATION.status.preLoading
  ) {
    arr[indexOperation] = { ...arr[indexOperation], status: CONTRACT_OPERATION.status.loading, hash: data?.hash };
  }
  if (isSuccess && arr[indexOperation].hash === dataWaitTransaction?.transactionHash) {
    arr[indexOperation] = { ...arr[indexOperation], status: CONTRACT_OPERATION.status.success };
  }

  return arr;
};

export const approveOperation = ({ page = '/', prevData = [], status = null, data = [], operation }) => {
  const indexOperation = prevData.findIndex(
    item => item.page === page && item.status === CONTRACT_OPERATION.status.preLoading && item.operation === operation
  );
  const arr = [...prevData];

  if (status === CONTRACT_OPERATION.status.error) {
    arr[indexOperation] = { ...arr[indexOperation], status: CONTRACT_OPERATION.status.error };
  }

  if (status === CONTRACT_OPERATION.status.success) {
    arr[indexOperation] = { ...arr[indexOperation], status: CONTRACT_OPERATION.status.loading, hash: data?.hash };
  }

  return arr;
};
