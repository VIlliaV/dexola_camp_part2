import { createContext, useContext, useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useBalance, useContractRead, useContractWrite, useToken, useWaitForTransaction } from 'wagmi';
import {
  CONTRACT_OPERATION,
  STAR_RUNNER_STAKING_CONTRACT,
  STAR_RUNNER_TOKEN_ADDRESS,
  STAR_RUNNER_TOKEN_CONTRACT,
  STAR_RUNNER_STAKING_ADDRESS,
} from './constants/constants';

import { operationChangeStatus } from './utils/helpers/operation';

const ContractContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useContextContract = () => useContext(ContractContext);

export const Context = ({ children }) => {
  const [updateInfo, setUpdateInfo] = useState(true);
  const [hash, setHash] = useState(null);
  const [dataOperation, setDataOperation] = useState([]);
  // console.log('🚀 ~ dataOperation:', dataOperation);

  const [valueForOperation, setValueForOperation] = useState('0');

  const { address } = useAccount();

  function useCustomContractWrite(functionName, contract = STAR_RUNNER_STAKING_CONTRACT) {
    const { write, data, status, reset } = useContractWrite({
      ...contract,

      functionName: functionName,
    });

    return {
      write,
      data,
      status,
      reset,
    };
  }

  const { data: balanceNoFormatting } = useBalance({
    address,
    token: STAR_RUNNER_TOKEN_ADDRESS,
    watch: updateInfo,
  });
  const balance = +balanceNoFormatting?.formatted || 0;

  const { data: tokenData } = useToken({
    address: STAR_RUNNER_TOKEN_ADDRESS,
  });
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
  } = useCustomContractWrite('approve', STAR_RUNNER_TOKEN_CONTRACT);

  const { write: stake, data: dataStake, status: statusStake, reset: resetStake } = useCustomContractWrite('stake');

  const { write: withdraw, data: dataWithdraw, status: statusWithdraw } = useCustomContractWrite('withdraw');

  const { write: withdrawExit, data: dataWithdrawExit, status: statusWithdrawExit } = useCustomContractWrite('exit');

  const { write: writeRewards, data: dataRewards, status: statusRewards } = useCustomContractWrite('claimReward');

  const { data: availableRewards = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'earned',
    args: [address],

    watch: !updateInfo,
  });

  const { data: periodFinish = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'periodFinish',
    watch: updateInfo,
  });

  const { data: rewardRate = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'rewardRate',
    watch: updateInfo,
  });

  const { data: stakedBalance = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'balanceOf',
    args: [address],
    watch: updateInfo,
  });

  const { data: totalSupply = '0n' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'totalSupply',
    watch: updateInfo,
  });

  const { data: rewardForDuration = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'getRewardForDuration',
    watch: updateInfo,
  });

  const isHash = isHaveOldOperation !== hash;
  const {
    data: dataWaitTransaction,
    isSuccess,
    isError,
    isFetched,
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
    // console.log(
    //   '=??==!!== ~ statusStake, statusApprove, statusWithdraw, statusWithdrawExit, statusRewards, isSuccess, isError]:',
    //   statusStake,
    //   statusApprove,
    //   statusWithdraw,
    //   statusWithdrawExit,
    //   statusRewards,
    //   isSuccess,
    //   isError
    // );

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
    if (statusStake === 'success' || statusStake === 'error') {
      resetStake();
    }
    if (statusApprove === 'success' || statusApprove === 'error') {
      resetApprove();
    }

    if (
      isSuccess &&
      dataOperation[0]?.operation === CONTRACT_OPERATION.approve.operation &&
      (statusStake === 'idle' || statusStake === 'success')
    ) {
      setDataOperation(prev => {
        const arr = [...prev];
        arr.splice(0, 1);
        return arr;
      });
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
    dataOperation.length,
  ]);

  useEffect(() => {
    if (isFetched) {
      setUpdateInfo(true);
    } else {
      setUpdateInfo(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched]);

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
        availableRewards,
        tokenName,
        periodFinish,
        rewardRate,
        stakedBalance,
        totalSupply,
        rewardForDuration,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
