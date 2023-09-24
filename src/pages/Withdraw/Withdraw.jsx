import { formatEther, parseEther } from 'viem';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';

import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';
import toast from 'react-hot-toast';
import { PAGES_NAME, STAR_RUNNER_STAKING_CONTRACT } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { useContractRead, useAccount } from 'wagmi';
import { useState } from 'react';
import { ButtonContainer } from './Withdraw.styled';
import { validateData } from '../../utils/validation';
import { useLocation } from 'react-router-dom';
import { useContextContract } from '../../Context';

const Withdraw = () => {
  const [withdrawValue, setWithdrawValue] = useState('0');
  const { address } = useAccount();
  const { pathname } = useLocation();

  const { setDataOperation, withdraw, withdrawExit } = useContextContract();

  const { data: stakedBalance = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'balanceOf',
    args: [address],
    // chainId: 11155111,
  });

  // const { write: writeWithdraw, status } = useContractWrite({
  //   ...STAR_RUNNER_STAKING_CONTRACT,
  //   functionName: 'withdraw',
  //   chainId: 11155111,
  //   args: [parseEther(withdrawValue)],
  // });

  // const { write: writewithdrawValueExit } = useContractWrite({
  //   ...STAR_RUNNER_STAKING_CONTRACT,
  //   functionName: 'exit',
  //   chainId: 11155111,
  // });

  const available = +formatEther(stakedBalance);

  const handleSubmit = event => {
    event.preventDefault();

    const { error } = validateData(withdrawValue, available);

    if (!error) {
      setDataOperation(prev => {
        const arr = [
          ...prev,
          { page: pathname, status: 'pre-loading', valueOperation: withdrawValue, operation: 'withdraw' },
        ];
        return arr;
      });
      withdraw({ args: [parseEther(withdrawValue)] });
    } else {
      toast.error(error.message);
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
      <ButtonContainer>
        <Button typeButton="submit" form={PAGES_NAME.withdraw}>
          {PAGES_NAME.withdraw}
        </Button>
        <Button onClick={() => withdrawExit()} className="desktop with_out_bkg" form={PAGES_NAME.withdraw}>
          withdraw all & Claim rewards
        </Button>
      </ButtonContainer>
    </PagesContainer>
  );
};

export default Withdraw;
