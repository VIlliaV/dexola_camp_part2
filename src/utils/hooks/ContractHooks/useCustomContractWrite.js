import { useContractWrite } from 'wagmi';
import { STAR_RUNNER_STAKING_CONTRACT, STAR_RUNNER_TOKEN_CONTRACT } from '../../../constants/constants';
import { useEffect, useState } from 'react';

const useCustomContractWrite = ({ functionName, contract = STAR_RUNNER_STAKING_CONTRACT }) => {
  const { writeAsync, data, status, reset } = useContractWrite({ ...contract, functionName });
  return { writeAsync, data, status, reset };
};

const useContractWriteData = () => {
  const [functionData, setFunctionData] = useState('');
  useEffect(() => {
    if (!functionData?.functionName) return;
    TEST({ args: functionData.args });
  }, [functionData]);

  const {
    write: stake,
    data: dataStake,
    status: statusStake,
    reset: resetStake,
  } = useCustomContractWrite({ functionName: 'stake' });

  const {
    write: approve,
    data: dataApprove,
    status: statusApprove,
    reset: resetApprove,
  } = useCustomContractWrite({ functionName: 'approve', contract: STAR_RUNNER_TOKEN_CONTRACT });

  // const {
  //   write: withdraw,
  //   data: dataWithdraw,
  //   status: statusWithdraw,
  //   reset: resetWithdraw,
  // } = useCustomContractWrite({ functionName: 'withdraw' });

  const {
    writeAsync,
    data: dataWithdraw,
    status: statusWithdraw,
    reset: resetWithdraw,
  } = useCustomContractWrite({ functionName: functionData?.functionName });

  const TEST = async ({ typeFunction = '', args }) => {
    if (!functionData?.functionName) {
      setFunctionData({ functionName: typeFunction, args });
      return;
    }
    try {
      const { hash } = await writeAsync(args);
      return hash;
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
    setFunctionData(null);
  };

  const {
    write: withdrawExit,
    data: dataWithdrawExit,
    status: statusWithdrawExit,
    reset: resetWithdrawExit,
  } = useCustomContractWrite({ functionName: 'exit' });

  return {
    // withdraw,
    dataWithdraw,
    statusWithdraw,
    resetWithdraw,
    stake,
    dataStake,
    statusStake,
    resetStake,
    withdrawExit,
    dataWithdrawExit,
    statusWithdrawExit,
    resetWithdrawExit,
    approve,
    dataApprove,
    statusApprove,
    resetApprove,
    TEST,
    // hash,
  };
};

const useTest = () => {};

export { useCustomContractWrite, useContractWriteData, useTest };
