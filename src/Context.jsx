import { createContext, useContext, useEffect, useState } from 'react';
import {
  CONTRACT_OPERATION,
  STAR_RUNNER_STAKING_CONTRACT,
  STAR_RUNNER_TOKEN_ADDRESS,
  STAR_RUNNER_TOKEN_CONTRACT,
} from './constants/constants';
import { parseEther } from 'viem';
import { useAccount, useBalance, useContractWrite, useWaitForTransaction } from 'wagmi';
import { operationChangeStatus } from './utils/helpers/operation';

const ContractContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useContextContract = () => useContext(ContractContext);

export const Context = ({ children }) => {
  const [updateInfo, setUpdateInfo] = useState(false);
  console.log('🚀 ~ updateInfo:', updateInfo);
  const [dataOperation, setDataOperation] = useState([]);
  console.log('🚀 ~ dataOperation:', dataOperation);
  const [valueForOperation, setValueForOperation] = useState('0');
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
    token: STAR_RUNNER_TOKEN_ADDRESS,
    watch: updateInfo,
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
    data: dataWaitTransactionApprove,
    isSuccess: isSuccessApprove,
    isError: isErrorApprove,
  } = useWaitForTransaction({
    hash: dataApprove?.hash,
  });

  const {
    data: dataWaitTransactionWithdraw,
    isSuccess: isSuccessWithdraw,
    isError: isErrorWithdraw,
    isFetched: isFetchedWithdraw,
  } = useWaitForTransaction({
    hash: dataWithdraw?.hash,
  });

  const {
    data: dataWaitTransactionWithdrawExit,
    isSuccess: isSuccessWithdrawExit,
    isError: isErrorWithdrawExit,
    isFetched: isFetchedWithdrawExit,
  } = useWaitForTransaction({
    hash: dataWithdrawExit?.hash,
  });

  const {
    data: dataWaitTransactionStake,
    isSuccess: isSuccessStake,
    isError: isErrorStake,
    isFetched: isFetchedStake,
  } = useWaitForTransaction({
    hash: dataStake?.hash,
  });

  const filteredData = dataOperation.filter(item => item.hash === dataWaitTransactionApprove?.transactionHash);

  const findValue = filteredData.map(({ valueOperation }) => valueOperation);
  const [valueOperation] = findValue.length > 0 ? findValue : ['0'];

  const findPath = filteredData.map(({ page }) => page);
  const [PathOperation] = findPath.length > 0 ? findPath : ['0'];

  useEffect(() => {
    setDataOperation(prev =>
      operationChangeStatus({
        status: statusApprove,
        prevData: prev,
        isSuccess: isSuccessApprove,
        isError: isErrorApprove,
        data: dataApprove,
        dataWaitTransaction: dataWaitTransactionApprove,
        nameOPeration: CONTRACT_OPERATION.stake.operation.approve,
        isMoreOperation: true,
        path: PathOperation,
        nameOPerationNext: CONTRACT_OPERATION.stake.operation.stake,
        valueOperation: valueOperation,
      })
    );
    if (isSuccessApprove) stake({ args: [parseEther(valueOperation)] });
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusApprove, isSuccessApprove, isErrorApprove]);

  useEffect(() => {
    setDataOperation(prev =>
      operationChangeStatus({
        status: statusStake,
        prevData: prev,
        isSuccess: isSuccessStake,
        isError: isErrorStake,
        data: dataStake,
        dataWaitTransaction: dataWaitTransactionStake,
        nameOPeration: CONTRACT_OPERATION.stake.operation.stake,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusStake, isSuccessStake, isErrorStake]);

  useEffect(() => {
    setDataOperation(prev =>
      operationChangeStatus({
        status: statusWithdraw,
        prevData: prev,
        isSuccess: isSuccessWithdraw,
        isError: isErrorWithdraw,
        data: dataWithdraw,
        dataWaitTransaction: dataWaitTransactionWithdraw,
        nameOPeration: CONTRACT_OPERATION.withdraw.operation.withdraw,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusWithdraw, isSuccessWithdraw, isErrorWithdraw]);

  useEffect(() => {
    setDataOperation(prev =>
      operationChangeStatus({
        status: statusWithdrawExit,
        prevData: prev,
        isSuccess: isSuccessWithdrawExit,
        isError: isErrorWithdrawExit,
        data: dataWithdrawExit,
        dataWaitTransaction: dataWaitTransactionWithdrawExit,
        nameOPeration: CONTRACT_OPERATION.withdraw.operation.withdrawAll,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusWithdrawExit, isSuccessWithdrawExit, isErrorWithdrawExit]);

  useEffect(() => {
    if (isFetchedStake || isFetchedWithdraw || isFetchedWithdrawExit) {
      setUpdateInfo(true);
    } else {
      setUpdateInfo(false);
    }
  }, [isFetchedStake, isFetchedWithdraw, isFetchedWithdrawExit]);

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
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
