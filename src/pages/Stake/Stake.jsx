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

const Stake = () => {
  const [stake, setStake] = useState('0');
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
    token: STAR_RUNNER_TOKEN_ADDRESS,
  });
  const { write, status } = useContractWrite({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'stake',
    chainId: 11155111,
    args: [parseEther(stake)],
  });

  const {
    write: approve,

    data,
  } = useContractWrite({
    ...STAR_RUNNER_TOKEN_CONTRACT,
    functionName: 'approve',
    // address: STAR_RUNNER_STAKING_ADDRESS,
    // chainId: 11155111,
    args: [STAR_RUNNER_STAKING_ADDRESS, parseEther(stake)],
  });
  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) write();
  }, [isSuccess]);

  // const { config } = usePrepareContractWrite({
  //   ...STAR_RUNNER_STAKING_CONTRACT,
  //   functionName: 'stake',
  //   // chainId: 11155111,
  //   args: [parseEther(stake)],
  // });

  const available = +balance?.formatted;
  const handleSubmit = event => {
    event.preventDefault();
    // const { error } = validateData(userData);

    approve();
    // write();

    // !error
    //   ? toast.success(`Enjoy ${userData[email]} your number: ${userData[tel]} and password : ${userData[password]}`)
    //   : toast.error(error.message);
    // if (!error) {
    //   setUserData({});
    // }
  };

  return (
    <PagesContainer>
      <div>
        <PagesHead>
          <h2>{PAGES_NAME.stake}</h2>
          <Reward startBalance={stake} />
        </PagesHead>
        <Form onSubmit={handleSubmit} id={PAGES_NAME.stake}>
          <Label type={PAGES_NAME.stake} formValue={setStake}></Label>
          <Available available={available} tokenName="STRU" />
        </Form>
      </div>
      <OperationStatus media="mobile" stake={stake} status={status} />
      <Button typeButton="submit" form={PAGES_NAME.stake}>
        {PAGES_NAME.stake}
      </Button>
    </PagesContainer>
  );
};

export default Stake;
