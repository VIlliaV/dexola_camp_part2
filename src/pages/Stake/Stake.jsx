import { useState } from 'react';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import Reward from '../../components/ContractInfo/ContractData/Reward/Reward';
import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';
import OperationStatus from '../../components/OperationStatus/OperationStatus';

import {
  PAGES_NAME,
  CONTRACT_OPERATION,
  STAR_RUNNER_STAKING_ADDRESS,
  STAR_RUNNER_TOKEN_CONTRACT,
} from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { validateData } from '../../utils/validation';
import toast from 'react-hot-toast';
import { useContextContract } from '../../Context';
import { parseEther } from 'viem';

const Stake = () => {
  const [stakeValue, setStakeValue] = useState('');
  const { balance, writeContractData } = useContextContract();
  const { stakePage } = PAGES_NAME;
  const { functionName } = CONTRACT_OPERATION.approve;

  const handleSubmit = event => {
    event.preventDefault();
    const { error } = validateData(stakeValue, balance);

    if (!error) {
      writeContractData({
        contract: STAR_RUNNER_TOKEN_CONTRACT,
        functionName,
        args: [STAR_RUNNER_STAKING_ADDRESS, parseEther(stakeValue)],
      });
      setStakeValue('');
    } else {
      toast.error(error.message);
    }
  };

  return (
    <PagesContainer>
      <div>
        <PagesHead>
          <h2>{stakePage}</h2>
          <Reward amountToStake={+stakeValue} />
        </PagesHead>
        <Form onSubmit={handleSubmit} id={stakePage}>
          <Label type={stakePage} formValue={setStakeValue} maxAllowed={balance} initialValue={stakeValue}></Label>
          <Available available={balance} />
        </Form>
      </div>
      <OperationStatus media="mobile" />
      <Button typeButton="submit" form={stakePage}>
        {stakePage}
      </Button>
    </PagesContainer>
  );
};

export default Stake;
