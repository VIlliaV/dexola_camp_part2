import { formatEther, parseEther } from 'viem';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';

import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';
import toast from 'react-hot-toast';
import { PAGES_NAME, STAR_RUNNER_STAKING_CONTRACT } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { useContractRead, useAccount, useContractWrite } from 'wagmi';
import { useState, useEffect } from 'react';
import { ButtonContainer } from './Withdraw.styled';
import { validateData } from '../../utils/validation';
import { useLocation } from 'react-router-dom';
import { useContextContract } from '../../Context';

const Withdraw = () => {
  // const { innerWidth } = window;
  const [withdraw, setWithdraw] = useState('0');
  const { address } = useAccount();

  const { pathname } = useLocation();
  console.log('🚀 ~ pathname:', pathname);
  const { setValueForOperation, setDataOperation } = useContextContract();

  const { data: stakedBalance = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'balanceOf',
    args: [address],
    // chainId: 11155111,
  });

  const { write: writeWithdraw, status } = useContractWrite({
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

  // useEffect(() => {
  //   // setDataOperation(prev => [...prev, ...[pathname], { [pathname]: status }]);

  //   setDataOperation(prev => {
  //     prev[pathname] = status;
  //     return prev;
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [status]);

  useEffect(() => {
    setDataOperation(prev => {
      console.log('🚀 ~ prev:', prev);

      const findPath = prev.find(item => item.page === pathname);

      if (findPath) {
        const test = prev.map(item => (item.page === pathname ? { ...item, status } : item));
        // const next = [...prev, { ...test, status }];
        // console.log('🚀 ~ next:', next);
        return test;
      } else {
        const test = [...prev, { page: pathname, status: 'idle' }];
        //   prev.push({ page: pathname, status: 'idle' });
        console.log('🚀 ~ test:', test);
        return test;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleSubmit = event => {
    event.preventDefault();
    writeWithdraw();

    const { error } = validateData(withdraw, available);

    if (!error) {
      setValueForOperation(withdraw);
      writeWithdraw();
    } else {
      toast.error(error.message);
    }

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
          <Label type={PAGES_NAME.withdraw} formValue={setWithdraw} maxAllowed={available}></Label>
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
