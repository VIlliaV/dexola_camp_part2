import { useState } from 'react';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import Reward from '../../components/ContractInfo/ContractData/Reward/Reward';
import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';
import OperationStatus from '../../components/OperationStatus/OperationStatus';

import { PAGES_NAME, STAR_RUNNER_STAKING_CONTRACT, STAR_RUNNER_TOKEN_ADDRESS } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { useBalance } from 'wagmi';
import { useAccount } from 'wagmi';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { parseEther } from 'viem';

const Stake = () => {
  const [stake, setStake] = useState('1');
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
    token: STAR_RUNNER_TOKEN_ADDRESS,
  });

  const { config } = usePrepareContractWrite({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'stake',
    // chainId: 11155111,
    args: [parseEther(stake)],
  });
  const { write } = useContractWrite(config);
  // console.log('🚀 ~ data:', data);

  const available = +balance?.formatted;
  const handleSubmit = event => {
    event.preventDefault();
    // const { error } = validateData(userData);
    console.log('object :>> ', stake);

    write?.();
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
          <Reward />
        </PagesHead>
        <Form onSubmit={handleSubmit} id={PAGES_NAME.stake}>
          <Label type={PAGES_NAME.stake} formValue={setStake}></Label>
          <Available available={available} tokenName="STRU" />
        </Form>
      </div>
      <OperationStatus media="mobile" />
      <Button onClick={() => write?.()}>{PAGES_NAME.stake}</Button>
    </PagesContainer>
  );
};

export default Stake;
