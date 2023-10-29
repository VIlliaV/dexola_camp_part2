import { useContractWrite } from 'wagmi';
import { STAR_RUNNER_STAKING_CONTRACT } from '../../constants/constants';

const useCustomContractWrite = ({ functionName, contract = STAR_RUNNER_STAKING_CONTRACT }) => {
  const { write, data, status, reset } = useContractWrite({ ...contract, functionName });
  return { write, data, status, reset };
};

const useContractWriteData = () => {
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
    reset: resetWithdraw,
  } = useCustomContractWrite({ functionName: 'withdraw' });

  const {
    write: withdrawExit,
    data: dataWithdrawExit,
    status: statusWithdrawExit,
    reset: resetWithdrawExit,
  } = useCustomContractWrite({ functionName: 'exit' });

  return {
    withdraw,
    dataWithdraw,
    statusWithdraw,
    resetWithdraw,
    stake,
    dataStake,
    statusStake,
    resetStake,
    withdrawExit,
    dataWithdrawExit,
    statusWithdrawExit,
    resetWithdrawExit,
  };
};

export { useCustomContractWrite, useContractWriteData };
