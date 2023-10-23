import { useContractWrite } from 'wagmi';
import { STAR_RUNNER_STAKING_CONTRACT } from '../../constants/constants';

const useCustomContractWrite = ({ functionName, contract = STAR_RUNNER_STAKING_CONTRACT }) => {
  const { write, data, status, reset } = useContractWrite({ ...contract, functionName });
  return { write, data, status, reset };
};

export default useCustomContractWrite;
