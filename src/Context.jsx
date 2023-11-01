import { createContext, useContext, useEffect, useState } from 'react';
import { formatEther, parseEther } from 'viem';
import { writeContract, waitForTransaction } from '@wagmi/core';
// import { useWaitForTransaction } from 'wagmi';
import {
  CONTRACT_OPERATION,
  STAR_RUNNER_TOKEN_ADDRESS,
  STAR_RUNNER_STAKING_CONTRACT,
  // STAR_RUNNER_TOKEN_CONTRACT,
  // STAR_RUNNER_STAKING_ADDRESS,
} from './constants/constants';

import { approveOperation, operationChangeStatus } from './utils/helpers/operation';
import { useCustomContractWrite } from './utils/hooks/ContractHooks/useCustomContractWrite';
// import { useLocation } from 'react-router-dom';
import { useWalletInfo } from './utils/hooks/ContractHooks/useWalletInfo';
// import { useLocation } from 'react-router-dom';

const ContractContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useContextContract = () => useContext(ContractContext);

export const Context = ({ children }) => {
  const [updateInfo, setUpdateInfo] = useState(true);
  // const [hash, setHash] = useState(null);
  const [dataOperation, setDataOperation] = useState([]);
  console.log('🚀 ~ RealdataOperation:', dataOperation);
  const [valueForOperation, setValueForOperation] = useState('0');
  // const rlpShow = toRlp([
  //   '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  //   '0x0000000000000000000000002f112ed8a96327747565f4d4b4615be8fb89459d',
  //   '0x000000000000000000000000fdcb59c1dbffb8678b8bfe64c12ce915219dd401',
  // ]);
  // const show = hexToString('0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', { size: 32 });
  // const show1 = hexToString('0x0000000000000000000000002f112ed8a96327747565f4d4b4615be8fb89459d', { size: 32 });
  // const show2 = hexToString('0x000000000000000000000000fdcb59c1dbffb8678b8bfe64c12ce915219dd401', { size: 32 });
  // const show3 = hexToString(rlpShow, { size: 101 });
  // console.log('🚀 ~ show:', show, show1, show2, show3);
  // const { withdraw, dataWithdraw, statusWithdraw } = useContractWriteData;
  // const { pathname } = useLocation();

  // const { address } = useAccount();
  const { balance, symbol } = useWalletInfo({
    tokenForBalance: STAR_RUNNER_TOKEN_ADDRESS,
  });
  // const { data: balanceNoFormatting } = useBalance({
  //   address,
  //   token: STAR_RUNNER_TOKEN_ADDRESS,
  //   watch: true,
  // });
  // const balance = +balanceNoFormatting?.formatted || 0;
  // const { pathname } = useLocation();
  const showDATA = () => {
    console.log('🚀 ~ dataOperation:', dataOperation);
  };
  const writeContractData = async ({ contract = STAR_RUNNER_STAKING_CONTRACT, functionName = '', args }) => {
    try {
      const { hash } = await writeContract({ ...contract, functionName, args });
      console.log('🚀 ~ hash:', hash);
      const TransactionReceipt = await waitForTransaction({ hash });
      showDATA();
      if (functionName === 'approve') {
        writeContractData({ functionName: 'stake', args: [parseInt(TransactionReceipt?.logs[0]?.data || '0', 16)] });
      }
    } catch (error) {
      console.log('🚀 ~ error:', error);
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
      setDataOperation(prev => {
        const arr = [...prev];
        arr.splice(0, 1);
        return arr;
      });
    }
  }, [dataOperation]);
  useEffect(() => {
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

    setDataOperation(prev =>
      operationChangeStatus({
        // status: takeAStatus,
        prevData: prev,
        // isSuccess: isSuccess,
        // isError: isError,
        // data: takeAData,
        // dataWaitTransaction: dataWaitTransaction,
        // nameOPeration: whatIsOperation?.operation,
        // valueOperation: realValueForOperation,
      })
    );

    if (
      dataOperation[0]?.operation === CONTRACT_OPERATION.stake.operation &&
      dataOperation[0]?.status === CONTRACT_OPERATION.status.preLoading &&
      statusStake === 'idle'
    ) {
      stake({ args: [parseEther(dataOperation[0].valueOperation)] });
    }
    // if (
    //   dataOperation[0]?.operation === CONTRACT_OPERATION.approve.operation &&
    //   dataOperation[0]?.status === CONTRACT_OPERATION.status.preLoading &&
    //   statusApprove === 'idle'
    // ) {
    //   approve({ args: [STAR_RUNNER_STAKING_ADDRESS, parseEther(dataOperation[0].valueOperation)] });
    // }
    if ((statusStake === 'success' || statusStake === 'error') && dataOperation[0]?.hash) {
      resetStake();
    }
    // if ((statusApprove === 'success' || statusApprove === 'error') && dataOperation[0]?.hash) {
    //   resetApprove();
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // statusApprove,
    statusStake,
    // statusWithdraw,
    // statusWithdrawExit,
    statusRewards,
    // isSuccess,
    // isError,
    // isFetched,
    dataOperation.length,
  ]);

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
