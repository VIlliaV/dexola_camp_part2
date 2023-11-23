import { parseEther } from 'viem';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';
import toast from 'react-hot-toast';
import { CONTRACT_OPERATION, PAGES_NAME } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { useEffect, useState } from 'react';
import { ButtonContainer, ButtonWithdrawExit } from './Withdraw.styled';
import { validateData } from '../../utils/validation';
import { useContextContract } from '../../Context';
import OperationStatus from '../../components/OperationStatus/OperationStatus';
import { useContractReadData } from '../../utils/hooks/ContractHooks/useCustomContractRead';

const Withdraw = () => {
  const [withdrawValue, setWithdrawValue] = useState('');
  const [isWithdrawExit, setIsWithdrawExit] = useState(false);
  const { stakedBalance, availableRewards } = useContractReadData({});
  const { dataOperation, writeContractData } = useContextContract();
  const { withdrawPage } = PAGES_NAME;
  const { exit, withdraw } = CONTRACT_OPERATION;

  useEffect(() => {
    setIsWithdrawExit(dataOperation.some(item => item.functionName === exit.functionName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataOperation]);

  const handleSubmit = event => {
    event.preventDefault();
    const { error } = validateData(withdrawValue, stakedBalance);
    if (!error) {
      writeContractData({ functionName: withdraw.functionName, args: [parseEther(withdrawValue)] });
      setWithdrawValue('');
    } else {
      toast.error(error.message);
    }
  };

  const handleWithdrawExit = () => {
    if (stakedBalance !== 0) {
      const isMoreWithdrawOrClaimOperation = dataOperation.some(
        item => item.pathname === '/withdraw' || item.pathname === '/claim'
      );
      const value = !isMoreWithdrawOrClaimOperation ? stakedBalance + ' + ' + availableRewards : ' ';
      writeContractData({ functionName: exit.functionName, value });
    } else {
      toast.error('you do not have on the Staked balance');
    }
  };

  return (
    <PagesContainer>
      <div>
        <PagesHead>
          <h2>{withdrawPage}</h2>
        </PagesHead>
        <Form onSubmit={handleSubmit} id={withdrawPage}>
          <Label
            type={withdrawPage}
            formValue={setWithdrawValue}
            maxAllowed={stakedBalance}
            initialValue={withdrawValue}
          ></Label>
          <Available available={stakedBalance} />
        </Form>
      </div>
      <OperationStatus media="mobile" />
      <ButtonContainer>
        <Button typeButton="submit" form={withdrawPage}>
          {withdrawPage}
        </Button>

        <ButtonWithdrawExit onClick={handleWithdrawExit} disabled={isWithdrawExit} className="desktop">
          withdraw all & Claim rewards
        </ButtonWithdrawExit>
      </ButtonContainer>
    </PagesContainer>
  );
};

export default Withdraw;
