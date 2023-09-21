import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';

import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';

import { PAGES_NAME, STAR_RUNNER_STAKING_CONTRACT } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { useContractRead, useAccount } from 'wagmi';

const Withdraw = () => {
  const { address } = useAccount();
  const { data: stakedBalance } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'balanceOf',
    args: [address],
    // chainId: 11155111,
  });
  const available = Number(stakedBalance);
  const handleSubmit = event => {
    event.preventDefault();
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
          <Label type={PAGES_NAME.withdraw}></Label>
          <Available available={available} />
        </Form>
      </div>
      <Button typeButton="submit" form={PAGES_NAME.withdraw}>
        {PAGES_NAME.withdraw}
      </Button>
    </PagesContainer>
  );
};

export default Withdraw;
