import { useEffect, useState } from 'react';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import Reward from '../../components/ContractInfo/ContractData/Reward/Reward';
import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';
import OperationStatus from '../../components/OperationStatus/OperationStatus';

import { CONTRACT_OPERATION, PAGES_NAME, STAR_RUNNER_STAKING_ADDRESS } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { validateData } from '../../utils/validation';
import toast from 'react-hot-toast';
import { useContextContract } from '../../Context';
import { useLocation } from 'react-router-dom';
import { useContractWriteData } from '../../utils/hooks/ContractHooks/useCustomContractWrite';
import { addOperation } from '../../utils/helpers/operation';
import { parseEther } from 'viem';

const Stake = () => {
  const [stakeValue, setStakeValue] = useState('0');
  const { pathname } = useLocation();
  const { setDataOperation, balance, handleApproveOperation } = useContextContract();
  const { approve, dataApprove, statusApprove, resetApprove, stake, dataStake, statusStake, resetStake } =
    useContractWriteData();

  useEffect(() => {
    if (statusApprove === CONTRACT_OPERATION.status.success) {
      setDataOperation(prev => {
        return addOperation({
          prev,
          // page: pathname,
          valueOperation: stakeValue,
          operation: CONTRACT_OPERATION.stake.operation,
        });
      });
      // stake({ args: [parseEther(stakeValue)] });
    }
    handleApproveOperation({
      page: pathname,
      status: statusApprove,
      data: dataApprove,
      operation: CONTRACT_OPERATION.approve.operation,
      resetFunction: resetApprove,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusApprove]);

  const handleSubmit = event => {
    event.preventDefault();
    const { error } = validateData(stakeValue, balance);

    if (!error) {
      setDataOperation(prev => {
        return addOperation({
          prev,
          // page: pathname,
          valueOperation: stakeValue,
          operation: CONTRACT_OPERATION.approve.operation,
        });
      });
      approve({ args: [STAR_RUNNER_STAKING_ADDRESS, parseEther(stakeValue)] });

      // setDataOperation(prev => {
      //   const arr = [
      //     ...prev,
      //     {
      //       page: pathname,
      //       status: CONTRACT_OPERATION.status.preLoading,
      //       valueOperation: stakeValue,
      //       operation: CONTRACT_OPERATION.approve.operation,
      //     },
      //     {
      //       page: pathname,
      //       status: CONTRACT_OPERATION.status.preLoading,
      //       valueOperation: stakeValue,
      //       operation: CONTRACT_OPERATION.stake.operation,
      //     },
      //   ];
      //   return arr;
      // });
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
