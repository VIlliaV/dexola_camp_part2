import { useEffect, useState } from 'react';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import Reward from '../../components/ContractInfo/ContractData/Reward/Reward';
import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';
import OperationStatus from '../../components/OperationStatus/OperationStatus';

import {
  PAGES_NAME,
  STAR_RUNNER_STAKING_CONTRACT,
  STAR_RUNNER_TOKEN_ADDRESS,
  STAR_RUNNER_STAKING_ADDRESS,
  STAR_RUNNER_TOKEN_CONTRACT,
} from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { useBalance, useWaitForTransaction } from 'wagmi';
import { useAccount } from 'wagmi';
import { useContractWrite } from 'wagmi';
import { parseEther } from 'viem';
import { validateData } from '../../utils/validation';
import toast from 'react-hot-toast';

const Stake = ({ setStatusStake, setStakeForOperation }) => {
  const [stake, setStake] = useState('0');
  const [successStake, setSuccessStake] = useState(false);
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
    token: STAR_RUNNER_TOKEN_ADDRESS,
    watch: successStake,
  });

  const {
    write,
    status,
    data: dataStake,
  } = useContractWrite({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'stake',
    chainId: 11155111,
    args: [parseEther(stake)],
  });
  const { isSuccess: isSuccessStake } = useWaitForTransaction({
    hash: dataStake?.hash,
  });
  const { write: approve, data: dataApprove } = useContractWrite({
    ...STAR_RUNNER_TOKEN_CONTRACT,
    functionName: 'approve',
    args: [STAR_RUNNER_STAKING_ADDRESS, parseEther(stake)],
  });
  const { isSuccess: isSuccessApprove } = useWaitForTransaction({
    hash: dataApprove?.hash,
  });
  useEffect(() => {
    if (isSuccessStake) setSuccessStake(true);
  }, [isSuccessStake]);
  console.log('🚀 ~ isSuccessStake:', isSuccessStake);
  useEffect(() => {
    if (isSuccessApprove) write();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessApprove]);
  useEffect(() => {
    setStatusStake(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  // const { config } = usePrepareContractWrite({
  //   ...STAR_RUNNER_STAKING_CONTRACT,
  //   functionName: 'stake',
  //   // chainId: 11155111,
  //   args: [parseEther(stake)],
  // });

  const available = +balance?.formatted;

  const handleSubmit = event => {
    event.preventDefault();
    const { error } = validateData(stake, available);

    if (!error) {
      setStakeForOperation(stake);
      approve();
    } else {
      toast.error(error.message);
    }
  };

  return (
    <PagesContainer>
      <div>
        <PagesHead>
          <h2>{PAGES_NAME.stake}</h2>
          <Reward startBalance={stake} />
        </PagesHead>
        <Form onSubmit={handleSubmit} id={PAGES_NAME.stake}>
          <Label type={PAGES_NAME.stake} formValue={setStake} maxAllowed={available}></Label>
          <Available available={available} tokenName="STRU" />
        </Form>
      </div>
      <OperationStatus media="mobile" stake={stake} statusStake={status} />
      <Button typeButton="submit" form={PAGES_NAME.stake}>
        {PAGES_NAME.stake}
      </Button>
    </PagesContainer>
  );
};

export default Stake;
