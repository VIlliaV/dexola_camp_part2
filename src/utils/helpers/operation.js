import { formatEther, parseEther } from 'viem';
import { CONTRACT_OPERATION, STAR_RUNNER_STAKING_ADDRESS, STAR_RUNNER_TOKEN_CONTRACT } from '../../constants/constants';
import { readContract } from '@wagmi/core';

export const handleArgsOperations = ({ args = [], functionName = '', dataOperation = [] }) => {
  const argsOperation = [...args];

  if (functionName === 'approve') {
    const approveValueObj = dataOperation.find(item => item.functionName === 'approve');
    const approveValue = approveValueObj
      ? approveValueObj.valueOperation + +formatEther(argsOperation[1])
      : +formatEther(argsOperation[1]);
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

export const fetchedOperation = ({ id, prev = [], status = CONTRACT_OPERATION.status.success }) => {
  const indexOperation = prev.findIndex(item => item.id === id);
  const arr = [...prev];

  if (status === CONTRACT_OPERATION.status.error) {
    arr[indexOperation] = { ...arr[indexOperation], status: CONTRACT_OPERATION.status.error };
  }

  if (status === CONTRACT_OPERATION.status.success) {
    arr[indexOperation] = { ...arr[indexOperation], status: CONTRACT_OPERATION.status.success };
  }

  return arr;
};
