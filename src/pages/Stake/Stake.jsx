import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import Reward from '../../components/ContractInfo/ContractData/Reward/Reward';
import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';
import OperationStatus from '../../components/OperationStatus/OperationStatus';

import { PAGES_NAME, STAR_RUNNER_TOKEN_ADDRESS } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { useBalance } from 'wagmi';
import { useAccount } from 'wagmi';
import { formatDecimalPlaces } from '@/utils/formating';

const Stake = () => {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
    token: STAR_RUNNER_TOKEN_ADDRESS,
  });

  const available = formatDecimalPlaces(+data?.formatted, 0);
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
          <h2>{PAGES_NAME.stake}</h2>
          <Reward />
        </PagesHead>
        <Form onSubmit={handleSubmit} id={PAGES_NAME.stake}>
          <Label type={PAGES_NAME.stake}></Label>
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
