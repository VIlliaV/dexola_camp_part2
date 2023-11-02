import { useContractWrite } from 'wagmi';
import { STAR_RUNNER_STAKING_CONTRACT, STAR_RUNNER_TOKEN_CONTRACT } from '../../../constants/constants';

const useCustomContractWrite = ({ functionName, contract = STAR_RUNNER_STAKING_CONTRACT }) => {
  const { write, data, status, reset } = useContractWrite({ ...contract, functionName });
  return { write, data, status, reset };
};

const useContractWriteData = () => {
  // useEffect(() => {
  //   if (!hashTest) return;
  //   // console.log('🚀 ~ hashTest:', hashTest);
  //   hashWait();
  // }, [hashTest]);

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

export { useCustomContractWrite, useContractWriteData };
