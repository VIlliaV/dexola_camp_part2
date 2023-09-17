import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import { PAGES_NAME } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';

const ClaimRewards = () => {
  return (
    <PagesContainer>
      <div>
        <PagesHead>
          <h2>{PAGES_NAME.withdraw}</h2>
        </PagesHead>
        <Available />
      </div>
      <Button typeButton="submit" form={PAGES_NAME.withdraw}>
        {PAGES_NAME.withdraw}
      </Button>
    </PagesContainer>
  );
};

export default ClaimRewards;
