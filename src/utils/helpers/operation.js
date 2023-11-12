import { formatEther, parseEther } from 'viem';
import { CONTRACT_OPERATION, STAR_RUNNER_STAKING_ADDRESS, STAR_RUNNER_TOKEN_CONTRACT } from '../../constants/constants';
import { readContract } from '@wagmi/core';
const { success, error, loading } = CONTRACT_OPERATION.status;

export const handleArgsOperations = ({ args = [], functionName = '', dataOperation = [], value = null }) => {
  const argsOperation = [...args];

  if (functionName === 'approve') {
    const approveValueObj = dataOperation.find(item => item.functionName === 'approve');
    const approveValue = approveValueObj
      ? approveValueObj.valueOperation + +formatEther(argsOperation[1])
      : +formatEther(argsOperation[1]);
    argsOperation[1] = parseEther(approveValue.toString());
  }
  const valueOperationBig = argsOperation[1] ? argsOperation[1] : argsOperation[0];
  const valueOperation = value || +formatEther(valueOperationBig);

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
  prev = [],
  pathname = '/',
  status = loading,
  valueOperation = null,
  functionName = '',
}) => {
  let prevArr = [...prev];
  if (functionName === 'approve') prevArr = prev.filter(item => item.functionName !== 'approve');

  const arr = [...prevArr, { id, pathname, status, valueOperation, functionName }];
  return arr;
};

export const removeOperation = ({ id, prev = [] }) => {
  const indexToRemove = prev.findIndex(obj => obj.id === id);
  const arr = [...prev];

  if (indexToRemove !== -1) {
    arr.splice(indexToRemove, 1);
  }
  return arr;
};

export const fetchedOperation = ({ id, prev = [], status = success }) => {
  const indexOperation = prev.findIndex(item => item.id === id);
  const arr = [...prev];
  if (status === error) {
    arr[indexOperation] = { ...arr[indexOperation], status: error };
  }
  if (status === success) {
    arr[indexOperation] = { ...arr[indexOperation], status: success };
  }
  return arr;
};
