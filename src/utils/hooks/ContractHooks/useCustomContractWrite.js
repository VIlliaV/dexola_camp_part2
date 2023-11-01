import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { STAR_RUNNER_STAKING_CONTRACT, STAR_RUNNER_TOKEN_CONTRACT } from '../../../constants/constants';
import { useEffect, useState } from 'react';
import { writeContract, waitForTransaction } from '@wagmi/core';
import { parseEther } from 'viem';

const useCustomContractWrite = ({ functionName, contract = STAR_RUNNER_STAKING_CONTRACT }) => {
  const { write, data, status, reset } = useContractWrite({ ...contract, functionName });
  return { write, data, status, reset };
};

const useContractWriteData = () => {
  const [functionData, setFunctionData] = useState('');
  const [hashTest, setHashTest] = useState(null);
  // useEffect(() => {
  //   if (!hashTest) return;
  //   // console.log('🚀 ~ hashTest:', hashTest);
  //   hashWait();
  // }, [hashTest]);

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

  // const {
  //   writeAsync,
  //   data: dataWithdraw,
  //   status: statusWithdraw,
  //   reset: resetWithdraw,
  // } = useCustomContractWrite({ functionName: functionData?.functionName });

  // const {
  //   // data: dataWaitTransaction,
  //   status,
  //   // isSuccess,
  //   // isError,
  //   // refetch,
  //   // isFetched,
  // } = useWaitForTransaction({
  //   hash: hashTest,
  // });
  // console.log('🚀 ~ status:', status);
  // const hashWait = async () => {
  //   try {
  //     console.log('🚀 ~ hashTest:', hashTest);
  //     const { TransactionReceipt } = await refetch();
  //     console.log('🚀 ~ TransactionReceipt:', TransactionReceipt);

  //     return TransactionReceipt;
  //   } catch (error) {
  //     console.log('🚀 ~ error:', error);
  //   }
  //   setHashTest(false);
  // };
  const writeContractData = async ({ contract = STAR_RUNNER_STAKING_CONTRACT, typeFunction = '', args }) => {
    try {
      const { hash } = await writeContract({ ...contract, functionName: typeFunction, args });
      const TransactionReceipt = await waitForTransaction({ hash });
      if (typeFunction === 'withdraw') {
        writeContractData({ typeFunction: 'withdraw', args: [parseInt(TransactionReceipt?.logs[0]?.data || '0', 16)] });
      }
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  };

  const {
    write: withdrawExit,
    data: dataWithdrawExit,
    status: statusWithdrawExit,
    reset: resetWithdrawExit,
  } = useCustomContractWrite({ functionName: 'exit' });

  return {
    // withdraw,
    // dataWithdraw,
    // statusWithdraw,
    // resetWithdraw,
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

    // hash,
  };
};

const useTest = () => {};

export { useCustomContractWrite, useContractWriteData, useTest };
