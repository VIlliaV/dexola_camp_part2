import { parseEther } from 'viem';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';
import toast from 'react-hot-toast';
import { PAGES_NAME } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { useState } from 'react';
import { ButtonContainer, ButtonWithdrawExit } from './Withdraw.styled';
import { validateData } from '../../utils/validation';
import { useContextContract } from '../../Context';
import OperationStatus from '../../components/OperationStatus/OperationStatus';
import { useContractReadData } from '../../utils/hooks/ContractHooks/useCustomContractRead';

const Withdraw = () => {
  const [withdrawValue, setWithdrawValue] = useState('');
  const { stakedBalance, availableRewards } = useContractReadData({});
  const { dataOperation, writeContractData } = useContextContract();

  const handleSubmit = event => {
    event.preventDefault();
    const { error } = validateData(withdrawValue, stakedBalance);
    if (!error) {
      writeContractData({ functionName: 'withdraw', args: [parseEther(withdrawValue)] });
      setWithdrawValue('');
    } else {
      toast.error(error.message);
    }
  };

  const handleWithdrawExit = () => {
    if (stakedBalance !== 0) {
      const isMoreWithdrawOrClaimOperation = dataOperation.some(
        item => item.page === '/withdraw' || item.page === '/claim'
      );
      const value = !isMoreWithdrawOrClaimOperation ? stakedBalance + ' + ' + availableRewards : '';
      writeContractData({ functionName: 'exit', value });
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
          <Label
            type={PAGES_NAME.withdraw}
            formValue={setWithdrawValue}
            maxAllowed={stakedBalance}
            initialValue={withdrawValue}
          ></Label>
          <Available available={stakedBalance} />
        </Form>
      </div>
      <OperationStatus media="mobile" />
      <ButtonContainer>
        <Button typeButton="submit" form={PAGES_NAME.withdraw}>
          {PAGES_NAME.withdraw}
        </Button>

        <ButtonWithdrawExit onClick={handleWithdrawExit} className="desktop">
          withdraw all & Claim rewards
        </ButtonWithdrawExit>
      </ButtonContainer>
    </PagesContainer>
  );
};

export default Withdraw;
