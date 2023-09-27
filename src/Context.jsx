import { createContext, useContext, useEffect, useState } from 'react';
import {
  CONTRACT_OPERATION,
  STAR_RUNNER_STAKING_CONTRACT,
  STAR_RUNNER_TOKEN_ADDRESS,
  STAR_RUNNER_TOKEN_CONTRACT,
} from './constants/constants';
import { parseEther } from 'viem';
import { useAccount, useBalance, useContractRead, useContractWrite, useToken, useWaitForTransaction } from 'wagmi';
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
  const { data: balanceNoFormatting } = useBalance({
    address,
    token: STAR_RUNNER_TOKEN_ADDRESS,
    watch: updateInfo,
  });
  const balance = +balanceNoFormatting?.formatted || 0;

  const { data: tokenData } = useToken({
    address: STAR_RUNNER_TOKEN_ADDRESS,
    chainId: 11155111,
  });
  const tokenName = !tokenData?.name ? ':(' : tokenData?.name === 'StarRunner' ? 'STRU' : tokenData?.name;

  const { data: availableRewards = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'earned',
    args: [address],

    watch: !updateInfo,
  });
  const {
    write: approve,
    data: dataApprove,
    status: statusApprove,
  } = useContractWrite({
    ...STAR_RUNNER_TOKEN_CONTRACT,
    functionName: 'approve',
  });

  const {
    write: stake,
    data: dataStake,
    status: statusStake,
  } = useContractWrite({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'stake',
    chainId: 11155111,
  });

  const {
    write: withdraw,
    status: statusWithdraw,
    data: dataWithdraw,
  } = useContractWrite({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'withdraw',
    chainId: 11155111,
  });

  const {
    write: withdrawExit,
    status: statusWithdrawExit,
    data: dataWithdrawExit,
  } = useContractWrite({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'exit',
    chainId: 11155111,
  });

  const {
    write: writeRewards,
    status: statusRewards,
    data: dataRewards,
  } = useContractWrite({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'claimReward',
    chainId: 11155111,
  });

  const { data: periodFinish = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'periodFinish',
    watch: updateInfo,
    chainId: 11155111,
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
    chainId: 11155111,
    watch: updateInfo,
  });
  const { data: totalSupply = '0n' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'totalSupply',
    chainId: 11155111,
    watch: updateInfo,
  });

  const { data: rewardForDuration = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'getRewardForDuration',
    chainId: 11155111,
    watch: updateInfo,
  });

  const isHaveOldOperation = dataOperation.find(item => typeof item === 'object')?.hash;

  useEffect(() => {
    if (isHaveOldOperation !== hash) {
      setHash(isHaveOldOperation);
    }
  }, [isHaveOldOperation, hash]);

  const {
    data: dataWaitTransaction,
    isSuccess,
    isError,
    isFetched,
  } = useWaitForTransaction({
    hash: isHaveOldOperation,
  });

  useEffect(() => {
    const whatIsOperation = dataOperation.find(item => item.hash === dataWaitTransaction?.transactionHash);

    const takeAData =
      whatIsOperation?.operation === CONTRACT_OPERATION.stake.operation
        ? dataStake
        : whatIsOperation?.operation === CONTRACT_OPERATION.approve.operation
        ? dataApprove
        : whatIsOperation?.operation === CONTRACT_OPERATION.withdraw.operation
        ? dataWithdraw
        : whatIsOperation?.operation === CONTRACT_OPERATION.withdrawAll.operation
        ? dataWithdrawExit
        : dataRewards;

    const takeAStatus =
      whatIsOperation?.operation === CONTRACT_OPERATION.stake.operation
        ? statusStake
        : whatIsOperation?.operation === CONTRACT_OPERATION.approve.operation
        ? statusApprove
        : whatIsOperation?.operation === CONTRACT_OPERATION.withdraw.operation
        ? statusWithdraw
        : whatIsOperation?.operation === CONTRACT_OPERATION.withdrawAll.operation
        ? statusWithdrawExit
        : statusRewards;

    setDataOperation(prev =>
      operationChangeStatus({
        status: takeAStatus,
        prevData: prev,
        isSuccess: isSuccess,
        isError: isError,
        data: takeAData,
        dataWaitTransaction: dataWaitTransaction,
        nameOPeration: whatIsOperation?.operation,
        isMoreOperation: whatIsOperation?.operation === CONTRACT_OPERATION.approve.operation,
        path: whatIsOperation?.operation === CONTRACT_OPERATION.approve.operation ? whatIsOperation?.page : null,
        nameOPerationNext:
          whatIsOperation?.operation === CONTRACT_OPERATION.approve.operation
            ? CONTRACT_OPERATION.stake.operation
            : null,
        valueOperation: whatIsOperation?.valueOperation,
      })
    );

    if (
      isSuccess &&
      whatIsOperation?.operation === CONTRACT_OPERATION.approve.operation &&
      statusStake !== CONTRACT_OPERATION.status.loading
    ) {
      stake({ args: [parseEther(whatIsOperation?.valueOperation)] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusStake, statusApprove, statusWithdraw, statusWithdrawExit, statusRewards, isSuccess, isError]);

  useEffect(() => {
    if (isFetched) {
      setUpdateInfo(true);
    } else {
      setUpdateInfo(false);
    }
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
