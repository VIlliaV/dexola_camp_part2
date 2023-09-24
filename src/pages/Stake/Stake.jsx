import { useEffect, useState } from 'react';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import Reward from '../../components/ContractInfo/ContractData/Reward/Reward';
import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';
import OperationStatus from '../../components/OperationStatus/OperationStatus';

import {
  PAGES_NAME,
  STAR_RUNNER_STAKING_CONTRACT,
  STAR_RUNNER_TOKEN_ADDRESS,
  STAR_RUNNER_STAKING_ADDRESS,
  STAR_RUNNER_TOKEN_CONTRACT,
} from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { useBalance, useWaitForTransaction } from 'wagmi';
import { useAccount } from 'wagmi';
import { useContractWrite } from 'wagmi';
import { parseEther } from 'viem';
import { validateData } from '../../utils/validation';
import toast from 'react-hot-toast';
import { useContextContract } from '../../Context';
import { useLocation } from 'react-router-dom';

const Stake = () => {
  const [stake, setStake] = useState('0');
  const [successStake, setSuccessStake] = useState(false);
  // const [testCon, setTestCon] = useState('idle');
  // console.log('🚀 ~ testCon:', testCon);
  const { address } = useAccount();
  const { pathname } = useLocation();
  const { setValueForOperation, setDataOperation } = useContextContract();

  const { data: balance } = useBalance({
    address,
    token: STAR_RUNNER_TOKEN_ADDRESS,
    watch: successStake,
  });

  const {
    write,
    status,
    data: dataStake,
  } = useContractWrite({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'stake',
    chainId: 11155111,
    args: [parseEther(stake)],
  });

  const { isSuccess: isSuccessStake } = useWaitForTransaction({
    hash: dataStake?.hash,
  });

  // useEffect(() => {
  //   if (dataStake) setTestCon(dataStake?.hash);
  // }, [dataStake]);

  const { write: approve, data: dataApprove } = useContractWrite({
    ...STAR_RUNNER_TOKEN_CONTRACT,
    functionName: 'approve',
    args: [STAR_RUNNER_STAKING_ADDRESS, parseEther(stake)],
  });

  const { isSuccess: isSuccessApprove } = useWaitForTransaction({
    hash: dataApprove?.hash,
  });

  useEffect(() => {
    if (isSuccessStake) setSuccessStake(true);
  }, [isSuccessStake]);

  useEffect(() => {
    if (isSuccessApprove) write();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessApprove]);
  // useEffect(() => {
  //   // setDataOperation(prev => [...prev, ...[pathname], { [pathname]: status }]);

  //   setDataOperation(prev => {
  //     prev[pathname] = status;
  //     return prev;
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [status]);
  // const pageTest = 'testPage';
  // console.log('object :>> ', pathname === '/');
  useEffect(() => {
    // setDataOperation(prev => [...prev, ...[pathname], { [pathname]: status }]);
    // if (pathname === '/')
    setDataOperation(prev => {
      const findPath = prev.find(item => item.page === pathname);
      if (findPath) {
        const test = prev.map(item =>
          item.page === pathname ? { ...item, status, valueOperation: stake, operation: () => approve() } : item
        );
        return test;
      } else {
        const test = [...prev, { page: pathname, status: 'idle' }];
        return test;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  console.log('🚀 ~ status:', status);

  // const { config } = usePrepareContractWrite({
  //   ...STAR_RUNNER_STAKING_CONTRACT,
  //   functionName: 'stake',
  //   // chainId: 11155111,
  //   args: [parseEther(stake)],
  // });

  const available = +balance?.formatted;

  const handleSubmit = event => {
    event.preventDefault();
    const { error } = validateData(stake, available);

    if (!error) {
      setValueForOperation(stake);
      approve();
    } else {
      toast.error(error.message);
    }
  };

  return (
    <PagesContainer>
      <div>
        <PagesHead>
          <h2>{PAGES_NAME.stake}</h2>
          <Reward startBalance={stake} />
        </PagesHead>
        <Form onSubmit={handleSubmit} id={PAGES_NAME.stake}>
          <Label type={PAGES_NAME.stake} formValue={setStake} maxAllowed={available}></Label>
          <Available available={available} tokenName="STRU" />
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
