import { useState } from 'react';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import Reward from '../../components/ContractInfo/ContractData/Reward/Reward';
import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';
import OperationStatus from '../../components/OperationStatus/OperationStatus';

import { PAGES_NAME, STAR_RUNNER_STAKING_ADDRESS, STAR_RUNNER_TOKEN_CONTRACT } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { validateData } from '../../utils/validation';
import toast from 'react-hot-toast';
import { useContextContract } from '../../Context';
import { parseEther } from 'viem';

const Stake = () => {
  const [stakeValue, setStakeValue] = useState('0');
  const { balance, writeContractData } = useContextContract();

  const handleSubmit = event => {
    event.preventDefault();
    const { error } = validateData(stakeValue, balance);

    if (!error) {
      writeContractData({
        contract: STAR_RUNNER_TOKEN_CONTRACT,
        functionName: 'approve',
        args: [STAR_RUNNER_STAKING_ADDRESS, parseEther(stakeValue)],
      });
    } else {
      toast.error(error.message);
    }
  };

  return (
    <PagesContainer>
      <div>
        <PagesHead>
          <h2>{PAGES_NAME.stake}</h2>
          <Reward amountToStake={+stakeValue} />
        </PagesHead>
        <Form onSubmit={handleSubmit} id={PAGES_NAME.stake}>
          <Label type={PAGES_NAME.stake} formValue={setStakeValue} maxAllowed={balance}></Label>
          <Available available={balance} />
        </Form>
      </div>
      <OperationStatus media="mobile" />
      <Button typeButton="submit" form={PAGES_NAME.stake}>
        {PAGES_NAME.stake}
      </Button>
    </PagesContainer>
  );
};

export default Stake;
