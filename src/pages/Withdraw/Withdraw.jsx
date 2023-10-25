import { formatEther, parseEther } from 'viem';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';

import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';
import toast from 'react-hot-toast';
import { CONTRACT_OPERATION, PAGES_NAME } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { useState } from 'react';
import { ButtonContainer } from './Withdraw.styled';
import { validateData } from '../../utils/validation';
import { useLocation } from 'react-router-dom';
import { useContextContract } from '../../Context';
import OperationStatus from '../../components/OperationStatus/OperationStatus';
import { addOperation } from '../../utils/helpers/operation';

const Withdraw = () => {
  const [withdrawValue, setWithdrawValue] = useState('0');
  const { pathname } = useLocation();

  const { setDataOperation, withdraw, withdrawExit, availableRewards, dataOperation, stakedBalance } =
    useContextContract();

  const available = +formatEther(stakedBalance);
  const availableForClaim = formatEther(availableRewards);

  const handleSubmit = event => {
    event.preventDefault();
    const { error } = validateData(withdrawValue, available);

    if (!error) {
      setDataOperation(prev => {
        return addOperation({
          prev,
          page: pathname,
          valueOperation: withdrawValue,
          operation: CONTRACT_OPERATION.withdraw.operation,
        });
      });
      withdraw({ args: [parseEther(withdrawValue)] });
    } else {
      toast.error(error.message);
    }
  };
  //   if (!error) {
  //     setDataOperation(prev => {
  //       const arr = [
  //         ...prev,
  //         {
  //           page: pathname,
  //           status: CONTRACT_OPERATION.status.preLoading,
  //           valueOperation: withdrawValue,
  //           operation: CONTRACT_OPERATION.withdraw.operation,
  //         },
  //       ];
  //       return arr;
  //     });
  //     withdraw({ args: [parseEther(withdrawValue)] });
  //   } else {
  //     toast.error(error.message);
  //   }
  // };

  const handleWithdrawExit = () => {
    console.log(dataOperation);
    if (available !== 0) {
      setDataOperation(prev => {
        //     const arr = [
        //       ...prev,
        //       {
        //         page: pathname,
        //         status: CONTRACT_OPERATION.status.preLoading,
        //         valueOperation: available + ' + ' + availableForClaim,
        //         operation: CONTRACT_OPERATION.withdrawAll.operation,
        //       },
        //     ];
        //     return arr;
        //   });
        return addOperation({
          prev,
          page: pathname,
          valueOperation: available + ' + ' + availableForClaim,
          operation: CONTRACT_OPERATION.withdrawAll.operation,
        });
      });
      withdrawExit();
    } else {
      toast.error('you do not have on the Staked balance');
    }
  };

  return (
    <PagesContainer>
      <div>
        <PagesHead>
          <h2>{PAGES_NAME.withdraw}</h2>
        </PagesHead>
        <Form onSubmit={handleSubmit} id={PAGES_NAME.withdraw}>
          <Label type={PAGES_NAME.withdraw} formValue={setWithdrawValue} maxAllowed={available}></Label>
          <Available available={available} />
        </Form>
      </div>
      <OperationStatus media="mobile" />
      <ButtonContainer>
        <Button typeButton="submit" form={PAGES_NAME.withdraw}>
          {PAGES_NAME.withdraw}
        </Button>

        <Button onClick={handleWithdrawExit} className="desktop with_out_bkg" form={PAGES_NAME.withdraw}>
          withdraw all & Claim rewards
        </Button>
      </ButtonContainer>
    </PagesContainer>
  );
};

export default Withdraw;
