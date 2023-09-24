import { createContext, useContext, useEffect, useState } from 'react';
import {
  STAR_RUNNER_STAKING_CONTRACT,
  STAR_RUNNER_TOKEN_ADDRESS,
  STAR_RUNNER_TOKEN_CONTRACT,
} from './constants/constants';
import { parseEther } from 'viem';
import { useAccount, useBalance, useContractWrite, useWaitForTransaction } from 'wagmi';

const ContractContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useContextContract = () => useContext(ContractContext);

export const Context = ({ children }) => {
  const [updateInfo, setUpdateInfo] = useState(false);

  // const [isError, setIsError] = useState(false);
  const [dataOperation, setDataOperation] = useState([]);
  // console.log('🚀 ~ dataOperation:', dataOperation);
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
    data: dataWaitTransaction,
    isSuccess: isSuccessApprove,
    isError: isErrorApprove,
  } = useWaitForTransaction({
    hash: dataApprove?.hash,
  });

  const {
    data: dataWaitTransactionStake,
    isSuccess: isSuccessStake,
    isError: isErrorStake,
    isFetched: isFetchedStake,
  } = useWaitForTransaction({
    hash: dataStake?.hash,
  });

  const filteredData = dataOperation.filter(item => item.hash === dataWaitTransaction?.transactionHash);

  const findValue = filteredData.map(({ valueOperation }) => valueOperation);
  const [valueOperation] = findValue.length > 0 ? findValue : ['0'];

  const findPath = filteredData.map(({ page }) => page);
  const [PathOperation] = findPath.length > 0 ? findPath : ['0'];

  useEffect(() => {
    if (isErrorStake || isErrorApprove) {
      setDataOperation(prev => {
        const arr = prev.map(item =>
          item.hash === dataApprove?.hash || item.hash === dataStake?.hash ? { ...item, status: 'error' } : item
        );
        return arr;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorStake, isErrorApprove]);

  useEffect(() => {
    if (statusApprove === 'error') {
      setDataOperation(prev => {
        const arr = prev.map(item =>
          item.status === 'pre-loading' && item.operation === 'approve' ? { ...item, status: 'error' } : item
        );
        return arr;
      });
    } else if (statusApprove === 'success') {
      setDataOperation(prev => {
        const arr = prev.map(item =>
          item.status === 'pre-loading' && item.operation === 'approve'
            ? { ...item, status: 'loading', hash: dataApprove?.hash }
            : item
        );
        return arr;
      });
    }
    if (isSuccessApprove) {
      setDataOperation(prev => {
        const arrApprove = prev.map(item =>
          item.hash === dataWaitTransaction?.transactionHash ? { ...item, status: 'success' } : item
        );
        const arr = [...arrApprove, { page: PathOperation, status: 'pre-loading', operation: 'stake', valueOperation }];
        return arr;
      });
      stake({ args: [parseEther(valueOperation)] });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusApprove, isSuccessApprove]);

  useEffect(() => {
    if (statusStake === 'error') {
      setDataOperation(prev => {
        const arr = prev.map(item =>
          item.status === 'pre-loading' && item.operation === 'stake' ? { ...item, status: 'error' } : item
        );
        return arr;
      });
    } else if (statusStake === 'success') {
      setDataOperation(prev => {
        const arr = prev.map(item =>
          item.status === 'pre-loading' && item.operation === 'stake'
            ? { ...item, status: 'loading', hash: dataStake?.hash }
            : item
        );
        return arr;
      });
    }

    if (isSuccessStake) {
      setDataOperation(prev => {
        const arr = prev.map(item =>
          item.hash === dataWaitTransactionStake?.transactionHash ? { ...item, status: 'success' } : item
        );
        return arr;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusStake, isSuccessStake]);

  useEffect(() => {
    if (isFetchedStake) {
      setUpdateInfo(true);
    } else {
      setUpdateInfo(false);
    }
  }, [isFetchedStake]);

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
