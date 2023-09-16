import Button from '../../components/Buttons/Button';
import Reward from '../../components/ContractInfo/ContractData/Reward/Reward';
import { PagesHead } from '../Pages.styled';

const Stake = () => {
  return (
    <div>
      <PagesHead>
        <h2>Stake</h2>
        <Reward />
      </PagesHead>
      <form>
        <label>
          <input type="number" />
          <p>error</p>
        </label>
        <p>Available:</p>
      </form>
      <loader></loader>
      <Button>Stake</Button>
    </div>
  );
};

export default Stake;
