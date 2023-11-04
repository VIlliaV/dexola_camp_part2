import { formatEther, parseEther } from 'viem';
import { CONTRACT_OPERATION, STAR_RUNNER_STAKING_ADDRESS, STAR_RUNNER_TOKEN_CONTRACT } from '../../constants/constants';
import { readContract } from '@wagmi/core';

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

export const handleArgsOperations = ({ args = [], functionName = '', dataOperation = [] }) => {
  const argsOperation = [...args];
  if (functionName === 'approve') {
    const approveValueObj = dataOperation.find(item => item.functionName === 'approve');
    const approveValue = approveValueObj
      ? approveValueObj.valueOperation + +formatEther(argsOperation[1])
      : +formatEther(argsOperation[1]);

    // const approveValue = dataOperation.reduce((accumulator, item) => {
    //   if (item.operation === 'approve') {
    //     return accumulator + +item.valueOperation;
    //   }
    //   return accumulator;
    // }, +formatEther(args[1]));
    argsOperation[1] = parseEther(approveValue.toString());
  }

  const valueOperationBig = argsOperation[1] ? argsOperation[1] : argsOperation[0];

  const valueOperation = +formatEther(valueOperationBig);

  return { valueOperation, valueOperationBig, argsOperation };
};

export const handleReadyForStake = async ({ address, valueOperationBig }) => {
  try {
    const allowance = await readContract({
      ...STAR_RUNNER_TOKEN_CONTRACT,
      functionName: 'allowance',
      args: [address, STAR_RUNNER_STAKING_ADDRESS],
    });
    if (+formatEther(allowance) >= +formatEther(valueOperationBig)) return true;
    return false;
  } catch (error) {
    throw new Error(error);
  }

  // console.log('🚀 ~ allowance:', allowance, valueOperationBig);
};

export const addOperation = ({
  id,
  prev,
  pathname = '/',
  status = CONTRACT_OPERATION.status.loading,
  valueOperation = null,
  functionName,
}) => {
  if (functionName === 'approve') prev = prev.filter(item => item.functionName !== 'approve');

  const arr = [...prev, { id, pathname, status, valueOperation, functionName }];
  return arr;
};

export const removeOperation = ({ id, prev }) => {
  const indexToRemove = prev.findIndex(obj => obj.id === id);
  const arr = [...prev];

  if (indexToRemove !== -1) {
    arr.splice(indexToRemove, 1);
  }
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
    item => item.page === page && item.status === CONTRACT_OPERATION.status.loading && item.operation === operation
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

export const approveOperation = ({ id, prev = [], status = null, data = [] }) => {
  const indexOperation = prev.findIndex(item => item.id === id);
  const arr = [...prev];

  if (status === CONTRACT_OPERATION.status.error) {
    arr[indexOperation] = { ...arr[indexOperation], status: CONTRACT_OPERATION.status.error };
  }

  if (status === CONTRACT_OPERATION.status.success) {
    arr[indexOperation] = { ...arr[indexOperation], status: CONTRACT_OPERATION.status.success, hash: data };
  }

  return arr;
};
