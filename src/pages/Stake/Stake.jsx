import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import Reward from '../../components/ContractInfo/ContractData/Reward/Reward';
import Form from '../../components/Form/Form';
import Label from '../../components/Form/FormComponents/Label/Label';

import { PAGES_NAME } from '../../constants/constants';
import { PagesHead } from '../Pages.styled';

const Stake = () => {
  const handleSubmit = event => {
    event.preventDefault();
    // const { error } = validateData(userData);
    console.log('object :>> ');
    console.log('object :>> ', event.target.name, event.target.value);

    // !error
    //   ? toast.success(`Enjoy ${userData[email]} your number: ${userData[tel]} and password : ${userData[password]}`)
    //   : toast.error(error.message);
    // if (!error) {
    //   setUserData({});
    // }
  };
  return (
    <div>
      <PagesHead>
        <h2>{PAGES_NAME.stake}</h2>
        <Reward />
      </PagesHead>
      <Form onSubmit={handleSubmit} id={PAGES_NAME.stake}>
        <Label type={PAGES_NAME.stake}></Label>
        <Available />
      </Form>
      <div>Loader</div>
      <Button typeButton="submit" form={PAGES_NAME.stake}>
        {PAGES_NAME.stake}
      </Button>
    </div>
  );
};

export default Stake;
