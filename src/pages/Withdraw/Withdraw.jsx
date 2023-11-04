import { parseEther } from 'viem';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';

import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';
import toast from 'react-hot-toast';
import { PAGES_NAME } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { useState } from 'react';
import { ButtonContainer } from './Withdraw.styled';
import { validateData } from '../../utils/validation';
// import { useLocation } from 'react-router-dom';
import { useContextContract } from '../../Context';
import OperationStatus from '../../components/OperationStatus/OperationStatus';
// import { addOperation } from '../../utils/helpers/operation';
import { useContractReadData } from '../../utils/hooks/ContractHooks/useCustomContractRead';
// import { useContractWriteData } from '../../utils/hooks/ContractHooks/useCustomContractWrite';
// import { useWaitForTransaction } from 'wagmi';

const Withdraw = () => {
  const [withdrawValue, setWithdrawValue] = useState('0');
  // const { pathname } = useLocation();
  const { stakedBalance, availableRewards } = useContractReadData({});
  const { dataOperation, writeContractData } = useContextContract();
  // const {
  //   // withdraw,
  //   // dataWithdraw,
  //   // statusWithdraw,
  //   // resetWithdraw,
  //   withdrawExit,
  //   dataWithdrawExit,
  //   statusWithdrawExit,
  //   resetWithdrawExit,
  // } = useContractWriteData();

  // useEffect(() => {
  //   handleApproveOperation({
  //     page: pathname,
  //     status: statusWithdraw,
  //     data: dataWithdraw,
  //     operation: CONTRACT_OPERATION.withdraw.operation,
  //     resetFunction: resetWithdraw,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [statusWithdraw]);

  // const isTest = dataOperation.find(item => item?.hash || item.page === pathname);
  // const hash = statusWithdraw === CONTRACT_OPERATION.status.success ? dataWithdraw?.hash : false;
  // console.log('🚀 ~ hash:', hash);
  // const {
  //   data: dataWaitTransaction,
  //   status,
  //   isSuccess,
  //   isError,

  //   // isFetched,
  // } = useWaitForTransaction({
  //   hash: hash,
  //   suspense: true,
  // });
  // console.log(
  //   '🚀 ~ dataWaitTransaction:',
  //   dataWithdraw?.hash,
  //   statusWithdraw,
  //   // dataWaitTransaction,
  //   // isSuccess,
  //   // isError,
  //   status
  // );

  // useEffect(() => {
  //   handleApproveOperation({
  //     page: pathname,
  //     status: statusWithdrawExit,
  //     data: dataWithdrawExit,
  //     operation: CONTRACT_OPERATION.withdrawAll.operation,
  //     resetFunction: resetWithdrawExit,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [statusWithdrawExit]);

  const handleSubmit = event => {
    event.preventDefault();
    const { error } = validateData(withdrawValue, stakedBalance);
    if (!error) {
      // setDataOperation(prev => {
      //   return addOperation({
      //     prev,
      //     page: pathname,
      //     valueOperation: withdrawValue,
      //     operation: CONTRACT_OPERATION.withdraw.operation,
      //   });
      // });
      writeContractData({ functionName: 'withdraw', args: [parseEther(withdrawValue)] });

      // try {
      //   const { hash } = await withdraw({ args: [parseEther(withdrawValue)] });
      //   console.log('🚀 ~ response:', hash);
      // } catch (error) {
      //   console.log('🚀 ~ error:', error);
      // }
      // withdraw({ args: [parseEther(withdrawValue)] });
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
      // withdrawExit();
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
          <Label type={PAGES_NAME.withdraw} formValue={setWithdrawValue} maxAllowed={stakedBalance}></Label>
          <Available available={stakedBalance} />
        </Form>
      </div>
      <OperationStatus media="mobile" />
      <ButtonContainer>
        <Button
          typeButton="submit"
          form={PAGES_NAME.withdraw}
          // disabled={statusWithdraw === CONTRACT_OPERATION.status.loading}
        >
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
