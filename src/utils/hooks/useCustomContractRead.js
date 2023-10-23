import { useContractRead } from 'wagmi';
import { STAR_RUNNER_STAKING_CONTRACT } from '../../constants/constants';

const useCustomContractRead = ({ functionName, contract = STAR_RUNNER_STAKING_CONTRACT, args = [], watch }) => {
  const { data } = useContractRead({ ...contract, functionName, args, watch });
  return { data };
};

export default useCustomContractRead;
