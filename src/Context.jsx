import { createContext, useContext, useState } from 'react';
import { writeContract, waitForTransaction } from '@wagmi/core';
import { nanoid } from 'nanoid';

import {
  CONTRACT_OPERATION,
  STAR_RUNNER_TOKEN_ADDRESS,
  STAR_RUNNER_STAKING_CONTRACT,
  STAR_RUNNER_TOKEN_CONTRACT,
  STAR_RUNNER_STAKING_ADDRESS,
} from './constants/constants';

import {
  addOperation,
  fetchedOperation,
  handleArgsOperations,
  handleReadyForStake,
  removeOperation,
} from './utils/helpers/operation';
import { useWalletInfo } from './utils/hooks/ContractHooks/useWalletInfo';
import { useLocation } from 'react-router-dom';

const ContractContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useContextContract = () => useContext(ContractContext);

export const Context = ({ children }) => {
  const [dataOperation, setDataOperation] = useState([]);
  const { pathname } = useLocation();
  const { balance, symbol, address } = useWalletInfo({
    tokenForBalance: STAR_RUNNER_TOKEN_ADDRESS,
  });
  const { approve, stake } = CONTRACT_OPERATION;

  const writeContractData = async ({
    contract = STAR_RUNNER_STAKING_CONTRACT,
    functionName = '',
    args = [],
    value = null,
  }) => {
    const { valueOperation, valueOperationBig, argsOperation } = handleArgsOperations({
      args,
      functionName,
      dataOperation,
      value,
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

    try {
      const { hash } = await writeContract({ ...contract, functionName, args: argsOperation });
      await waitForTransaction({ hash });
      // const realValueOperation = parseInt(TransactionReceipt?.logs[0]?.data || '0', 16);

      setDataOperation(prev => {
        return fetchedOperation({ id, prev });
      });
      if (functionName === approve.functionName) {
        const isReadyForStake = await handleReadyForStake({ address, valueOperationBig });
        if (isReadyForStake) {
          writeContractData({ functionName: stake.functionName, args: [args[1]] });
        } else {
          setDataOperation(prev => {
            removeOperation({ id, prev });
          });
          writeContractData({
            contract: STAR_RUNNER_TOKEN_CONTRACT,
            functionName: approve.functionName,
            args: [STAR_RUNNER_STAKING_ADDRESS, args[1]],
          });
          return;
        }
      }
    } catch (error) {
      setDataOperation(prev => {
        return fetchedOperation({ id, prev, status: CONTRACT_OPERATION.status.error });
      });
      console.log('🚀 ~ error:', error);
    }
  };

  return (
    <ContractContext.Provider
      value={{
        dataOperation,
        setDataOperation,
        balance,
        symbol,
        writeContractData,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
