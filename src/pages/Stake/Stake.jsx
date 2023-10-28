import { useState } from 'react';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import Reward from '../../components/ContractInfo/ContractData/Reward/Reward';
import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';
import OperationStatus from '../../components/OperationStatus/OperationStatus';

import { CONTRACT_OPERATION, PAGES_NAME } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { validateData } from '../../utils/validation';
import toast from 'react-hot-toast';
import { useContextContract } from '../../Context';
import { useLocation } from 'react-router-dom';

const Stake = () => {
  const [stake, setStake] = useState('0');
  const { pathname } = useLocation();
  const { setDataOperation, balance } = useContextContract();

  const handleSubmit = event => {
    event.preventDefault();
    const { error } = validateData(stake, balance);

    if (!error) {
      setDataOperation(prev => {
        const arr = [
          ...prev,
          {
            page: pathname,
            status: CONTRACT_OPERATION.status.preLoading,
            valueOperation: stake,
            operation: CONTRACT_OPERATION.approve.operation,
          },
          {
            page: pathname,
            status: CONTRACT_OPERATION.status.preLoading,
            valueOperation: stake,
            operation: CONTRACT_OPERATION.stake.operation,
          },
        ];
        return arr;
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
          <Reward amountToStake={+stake} />
        </PagesHead>
        <Form onSubmit={handleSubmit} id={PAGES_NAME.stake}>
          <Label type={PAGES_NAME.stake} formValue={setStake} maxAllowed={balance}></Label>
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
