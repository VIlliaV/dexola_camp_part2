import { createContext, useContext, useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useBalance, useToken, useWaitForTransaction } from 'wagmi';
import {
  CONTRACT_OPERATION,
  STAR_RUNNER_TOKEN_ADDRESS,
  STAR_RUNNER_TOKEN_CONTRACT,
  STAR_RUNNER_STAKING_ADDRESS,
} from './constants/constants';

import { operationChangeStatus } from './utils/helpers/operation';
import useCustomContractWrite from './utils/hooks/useCustomContractWrite';

const ContractContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useContextContract = () => useContext(ContractContext);

export const Context = ({ children }) => {
  const [updateInfo, setUpdateInfo] = useState(true);
  const [hash, setHash] = useState(null);
  const [dataOperation, setDataOperation] = useState([]);
  console.log('🚀 ~ dataOperation:', dataOperation);
  const [valueForOperation, setValueForOperation] = useState('0');

  const { address } = useAccount();

  const { data: balanceNoFormatting } = useBalance({
    address,
    token: STAR_RUNNER_TOKEN_ADDRESS,
    watch: true,
  });
  const balance = +balanceNoFormatting?.formatted || 0;

  const { data: tokenData } = useToken({ address: STAR_RUNNER_TOKEN_ADDRESS });
  const tokenName = !tokenData?.name ? ':(' : tokenData?.name === 'StarRunner' ? 'STRU' : tokenData?.name;
  const isHaveOldOperation = dataOperation[0]?.hash || false;

  useEffect(() => {
    if (isHaveOldOperation !== hash) {
      setHash(isHaveOldOperation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  const {
    write: approve,
    data: dataApprove,
    status: statusApprove,
    reset: resetApprove,
  } = useCustomContractWrite({ functionName: 'approve', contract: STAR_RUNNER_TOKEN_CONTRACT });
  const {
    write: stake,
    data: dataStake,
    status: statusStake,
    reset: resetStake,
  } = useCustomContractWrite({ functionName: 'stake' });
  const {
    write: withdraw,
    data: dataWithdraw,
    status: statusWithdraw,
  } = useCustomContractWrite({ functionName: 'withdraw' });
  const {
    write: withdrawExit,
    data: dataWithdrawExit,
    status: statusWithdrawExit,
  } = useCustomContractWrite({ functionName: 'exit' });
  const {
    write: writeRewards,
    data: dataRewards,
    status: statusRewards,
  } = useCustomContractWrite({ functionName: 'claimReward' });

  const isHash = isHaveOldOperation !== hash;
  const {
    data: dataWaitTransaction,
    isSuccess,
    isError,
    // isFetched,
  } = useWaitForTransaction({
    hash: isHash ? isHaveOldOperation : isHash,
  });

  const getOperationData = operation => {
    switch (operation) {
      case CONTRACT_OPERATION.stake.operation:
        return dataStake;
      case CONTRACT_OPERATION.approve.operation:
        return dataApprove;
      case CONTRACT_OPERATION.withdraw.operation:
        return dataWithdraw;
      case CONTRACT_OPERATION.withdrawAll.operation:
        return dataWithdrawExit;
      default:
        return dataRewards;
    }
  };

  const getOperationStatus = operation => {
    switch (operation) {
      case CONTRACT_OPERATION.stake.operation:
        return statusStake;
      case CONTRACT_OPERATION.approve.operation:
        return statusApprove;
      case CONTRACT_OPERATION.withdraw.operation:
        return statusWithdraw;
      case CONTRACT_OPERATION.withdrawAll.operation:
        return statusWithdrawExit;
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
    console.log(
      '=??==!!== ~ statusStake, statusApprove, statusWithdraw, statusWithdrawExit, statusRewards, isSuccess, isError]:',
      statusStake,
      statusApprove,
      statusWithdraw,
      statusWithdrawExit,
      statusRewards,
      isSuccess,
      isError
      // isFetched
    );

    const whatIsOperation = dataOperation.find(item => item.hash === dataWaitTransaction?.transactionHash);
    const takeAData = getOperationData(whatIsOperation?.operation);
    const takeAStatus = getOperationStatus(whatIsOperation?.operation);

    setDataOperation(prev =>
      operationChangeStatus({
        status: takeAStatus,
        prevData: prev,
        isSuccess: isSuccess,
        isError: isError,
        data: takeAData,
        dataWaitTransaction: dataWaitTransaction,
        nameOPeration: whatIsOperation?.operation,
      })
    );

    if (
      dataOperation[0]?.operation === CONTRACT_OPERATION.stake.operation &&
      dataOperation[0]?.status === CONTRACT_OPERATION.status.preLoading &&
      statusStake === 'idle'
    ) {
      stake({ args: [parseEther(dataOperation[0].valueOperation)] });
    }
    if (
      dataOperation[0]?.operation === CONTRACT_OPERATION.approve.operation &&
      dataOperation[0]?.status === CONTRACT_OPERATION.status.preLoading &&
      statusApprove === 'idle'
    ) {
      approve({ args: [STAR_RUNNER_STAKING_ADDRESS, parseEther(dataOperation[0].valueOperation)] });
    }
    if ((statusStake === 'success' || statusStake === 'error') && dataOperation[0]?.hash) {
      resetStake();
    }
    if ((statusApprove === 'success' || statusApprove === 'error') && dataOperation[0]?.hash) {
      resetApprove();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    statusApprove,
    statusStake,
    statusWithdraw,
    statusWithdrawExit,
    statusRewards,
    isSuccess,
    isError,
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
        approve,
        balance,
        updateInfo,
        setUpdateInfo,
        withdraw,
        withdrawExit,
        writeRewards,
        tokenName,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
