import { createContext, useContext, useEffect, useState } from 'react';
import { formatEther, parseEther } from 'viem';
import { writeContract, waitForTransaction, readContract } from '@wagmi/core';
import { nanoid } from 'nanoid';
// import { useWaitForTransaction } from 'wagmi';
import {
  CONTRACT_OPERATION,
  STAR_RUNNER_TOKEN_ADDRESS,
  STAR_RUNNER_STAKING_CONTRACT,
  STAR_RUNNER_TOKEN_CONTRACT,
  STAR_RUNNER_STAKING_ADDRESS,
} from './constants/constants';

import {
  addOperation,
  approveOperation,
  handleArgsOperations,
  handleReadyForStake,
  operationChangeStatus,
  removeOperation,
} from './utils/helpers/operation';
import { useCustomContractWrite } from './utils/hooks/ContractHooks/useCustomContractWrite';
// import { useLocation } from 'react-router-dom';
import { useWalletInfo } from './utils/hooks/ContractHooks/useWalletInfo';
// import { useContractReadData } from './utils/hooks/ContractHooks/useCustomContractRead';
import { useLocation } from 'react-router-dom';

const ContractContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useContextContract = () => useContext(ContractContext);

export const Context = ({ children }) => {
  const [updateInfo, setUpdateInfo] = useState(true);
  // const [hash, setHash] = useState(null);
  const [dataOperation, setDataOperation] = useState([]);
  console.log('🚀 ~ RealdataOperation:', dataOperation);
  const [valueForOperation, setValueForOperation] = useState('0');
  // const { allowance } = useContractReadData({});
  // console.log('🚀 ~ allowance:', allowance);

  // const { withdraw, dataWithdraw, statusWithdraw } = useContractWriteData;
  const { pathname } = useLocation();

  // const { address } = useAccount();
  const { balance, symbol, address } = useWalletInfo({
    tokenForBalance: STAR_RUNNER_TOKEN_ADDRESS,
  });

  // useEffect(() => {
  //   if (hash === null) return;
  //   // console.log('🚀 ~ allowanceREAL:', allowance);
  //   // writeContractData({ functionName: 'stake', args: [parseInt(hash?.logs[0]?.data || '0', 16)] });
  //   // console.log("🚀 ~ parseInt(hash?.logs[0]?.data || '0', 16):", parseInt(hash?.logs[0]?.data || '0', 16));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [hash]);

  const writeContractData = async ({ contract = STAR_RUNNER_STAKING_CONTRACT, functionName = '', args }) => {
    // const stakeValue = args[1] ? args[1] : args[0];
    console.log('🚀 ~ dataOperation:', dataOperation);
    const { valueOperation, valueOperationBig, argsOperation } = handleArgsOperations({
      args,
      functionName,
      dataOperation,
    });
    const id = nanoid();
    setDataOperation(prev => {
      return addOperation({
        id,
        prev,
        pathname,
        valueOperation,
        functionName,
      });
    });
    // if (functionName === 'approve') {
    //   const approveValue = dataOperation.reduce((accumulator, item) => {
    //     if (item.operation === 'approve') {
    //       return accumulator + +item.valueOperation;
    //     }
    //     return accumulator;
    //   }, +formatEther(args[1]));
    //   args[1] = parseEther(approveValue.toString());
    // }

    try {
      const { hash } = await writeContract({ ...contract, functionName, args: argsOperation });
      const TransactionReceipt = await waitForTransaction({ hash });
      const realValueOperation = parseInt(TransactionReceipt?.logs[0]?.data || '0', 16);

      setDataOperation(prev => {
        return approveOperation({
          id,
          pathname,
          status: CONTRACT_OPERATION.status.success,
          prev,
          data: TransactionReceipt?.hash,
          functionName,
        });
      });
      console.log('🚀 ~ LastdataOperation:', dataOperation);
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
    if (functionName === 'approve') {
      const isReadyForStake = handleReadyForStake({ address, valueOperationBig });
      if (isReadyForStake) {
        writeContractData({ functionName: 'stake', args: [valueOperationBig] });
      } else {
        setDataOperation(prev => {
          console.log('in SIDE');
          removeOperation({ id, prev });
        });
        writeContractData({
          contract: STAR_RUNNER_TOKEN_CONTRACT,
          functionName: 'approve',
          args: [STAR_RUNNER_STAKING_ADDRESS, valueOperationBig],
        });
        return;
      }
    }
  };

  // const { data: tokenData } = useToken({ address: STAR_RUNNER_TOKEN_ADDRESS });
  // const tokenName = !tokenData?.name ? ':(' : tokenData?.name === 'StarRunner' ? 'STRU' : tokenData?.name;
  // const isTest = dataOperation.find(item => item?.hash || item.page === pathname);
  // const isHaveOldOperation = isTest?.hash || false;

  // useEffect(() => {
  //   if (isHaveOldOperation !== hash) {
  //     setHash(isHaveOldOperation);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [hash]);

  function handleApproveOperation({ status, data, resetFunction, page, operation }) {
    if (status === CONTRACT_OPERATION.status.idle || status === CONTRACT_OPERATION.status.loading) return;

    setDataOperation(prev =>
      approveOperation({
        page,
        status,
        prevData: prev,
        data,
        operation,
      })
    );

    if (status === CONTRACT_OPERATION.status.success || status === CONTRACT_OPERATION.status.error) {
      resetFunction();
    }
  }

  // const {
  //   write: approve,
  //   data: dataApprove,
  //   status: statusApprove,
  //   reset: resetApprove,
  // } = useCustomContractWrite({ functionName: 'approve', contract: STAR_RUNNER_TOKEN_CONTRACT });
  const {
    write: stake,
    data: dataStake,
    status: statusStake,
    reset: resetStake,
  } = useCustomContractWrite({ functionName: 'stake' });
  // const {
  //   write: withdraw,
  //   data: dataWithdraw,
  //   status: statusWithdraw,
  // } = useCustomContractWrite({ functionName: 'withdraw' });
  // const {
  //   write: withdrawExit,
  //   data: dataWithdrawExit,
  //   status: statusWithdrawExit,
  // } = useCustomContractWrite({ functionName: 'exit' });
  const {
    write: writeRewards,
    data: dataRewards,
    status: statusRewards,
  } = useCustomContractWrite({ functionName: 'claimReward' });

  // const isHash = isHaveOldOperation !== hash;
  // const {
  //   data: dataWaitTransaction,
  //   isSuccess,
  //   isError,

  //   // isFetched,
  // } = useWaitForTransaction({
  //   hash: isHash ? isHaveOldOperation : isHash,
  //   // onSuccess(data) {
  //   //   console.log('Success', data);
  //   // },
  //   // onError(error) {
  //   //   console.log('Error', error);
  //   // },
  // });

  // useEffect(() => {
  //   // console.log('dataWaitTransaction :>> ', dataWaitTransaction?.transactionHash, isTest?.operation);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dataWaitTransaction]);

  const getOperationData = operation => {
    switch (operation) {
      case CONTRACT_OPERATION.stake.operation:
        return dataStake;
      // case CONTRACT_OPERATION.approve.operation:
      //   return dataApprove;
      // case CONTRACT_OPERATION.withdraw.operation:
      //   return dataWithdraw;
      // case CONTRACT_OPERATION.withdrawAll.operation:
      //   return dataWithdrawExit;
      default:
        return dataRewards;
    }
  };

  const getOperationStatus = operation => {
    switch (operation) {
      case CONTRACT_OPERATION.stake.operation:
        return statusStake;
      // case CONTRACT_OPERATION.approve.operation:
      //   return statusApprove;
      // case CONTRACT_OPERATION.withdraw.operation:
      //   return statusWithdraw;
      // case CONTRACT_OPERATION.withdrawAll.operation:
      //   return statusWithdrawExit;
      default:
        return statusRewards;
    }
  };
  useEffect(() => {
    if (
      dataOperation[0]?.status === CONTRACT_OPERATION.status.success ||
      dataOperation[0]?.status === CONTRACT_OPERATION.status.error
    ) {
      console.log('URA successful', dataOperation[0].id);
      setDataOperation(prev => removeOperation({ id: dataOperation[0].id, prev }));
    }
  }, [dataOperation]);
  // useEffect(() => {
  // console.log(
  //   '=??==!!== ~ statusStake, statusApprove, statusWithdraw, statusWithdrawExit, statusRewards, isSuccess, isError]:',
  //   statusStake,
  //   statusApprove,
  //   // statusWithdraw,
  //   // statusWithdrawExit,
  //   statusRewards,
  //   isSuccess,
  //   isError
  //   // isFetched
  // );
  // const realValueForOperation = formatEther(parseInt(dataWaitTransaction?.logs[0]?.data || '0', 16));
  // const whatIsOperation = dataOperation.find(item => item.hash === dataWaitTransaction?.transactionHash);
  // console.log('🚀 ~ whatIsOperation:', whatIsOperation);
  // const takeAData = getOperationData(whatIsOperation?.operation);
  // const takeAStatus = getOperationStatus(whatIsOperation?.operation);
  // setDataOperation(prev =>
  //   operationChangeStatus({
  //     // status: takeAStatus,
  //     prevData: prev,
  //     // isSuccess: isSuccess,
  //     // isError: isError,
  //     // data: takeAData,
  //     // dataWaitTransaction: dataWaitTransaction,
  //     // nameOPeration: whatIsOperation?.operation,
  //     // valueOperation: realValueForOperation,
  //   })
  // );
  // if (
  //   dataOperation[0]?.operation === CONTRACT_OPERATION.stake.operation &&
  //   dataOperation[0]?.status === CONTRACT_OPERATION.status.preLoading &&
  //   statusStake === 'idle'
  // ) {
  //   stake({ args: [parseEther(dataOperation[0].valueOperation)] });
  // }
  // if (
  //   dataOperation[0]?.operation === CONTRACT_OPERATION.approve.operation &&
  //   dataOperation[0]?.status === CONTRACT_OPERATION.status.preLoading &&
  //   statusApprove === 'idle'
  // ) {
  //   approve({ args: [STAR_RUNNER_STAKING_ADDRESS, parseEther(dataOperation[0].valueOperation)] });
  // }
  // if ((statusStake === 'success' || statusStake === 'error') && dataOperation[0]?.hash) {
  //   resetStake();
  // }
  // if ((statusApprove === 'success' || statusApprove === 'error') && dataOperation[0]?.hash) {
  //   resetApprove();
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  // statusApprove,
  // statusStake,
  // statusWithdraw,
  // statusWithdrawExit,
  // statusRewards,
  // isSuccess,
  // isError,
  // isFetched,
  // dataOperation.length,
  // ]);

  return (
    <ContractContext.Provider
      value={{
        dataOperation,
        setDataOperation,
        valueForOperation,
        setValueForOperation,
        // approve,
        balance,
        updateInfo,
        setUpdateInfo,
        // withdraw,
        // withdrawExit,
        writeRewards,
        symbol,
        handleApproveOperation,
        writeContractData,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
