import { formatEther, parseEther } from 'viem';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';

import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';

import { PAGES_NAME, STAR_RUNNER_STAKING_CONTRACT } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { useContractRead, useAccount, useContractWrite } from 'wagmi';
import { useState } from 'react';
import { ButtonContainer } from './Withdraw.styled';

const Withdraw = () => {
  // const { innerWidth } = window;
  const [withdraw, setWithdraw] = useState('0');
  const { address } = useAccount();
  const { data: stakedBalance = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'balanceOf',
    args: [address],
    // chainId: 11155111,
  });

  const { write: writeWithdraw } = useContractWrite({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'withdraw',
    chainId: 11155111,
    args: [parseEther(withdraw)],
  });
  const { write: writeWithdrawExit } = useContractWrite({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'exit',
    chainId: 11155111,
    // args: [parseEther(withdraw)],
  });
  const available = +formatEther(stakedBalance);
  const handleSubmit = event => {
    event.preventDefault();
    writeWithdraw();
    console.log('done whithdraw :>> ');

    // const { error } = validateData(userData);

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
          <h2>{PAGES_NAME.withdraw}</h2>
        </PagesHead>
        <Form onSubmit={handleSubmit} id={PAGES_NAME.withdraw}>
          <Label type={PAGES_NAME.withdraw} formValue={setWithdraw}></Label>
          <Available available={available} />
        </Form>
      </div>
      <ButtonContainer>
        <Button typeButton="submit" form={PAGES_NAME.withdraw}>
          {PAGES_NAME.withdraw}
        </Button>
        <Button onClick={() => writeWithdrawExit()} className="desktop with_out_bkg" form={PAGES_NAME.withdraw}>
          withdraw all & Claim rewards
        </Button>
      </ButtonContainer>
    </PagesContainer>
  );
};

export default Withdraw;
