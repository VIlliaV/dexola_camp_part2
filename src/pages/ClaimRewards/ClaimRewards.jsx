import toast from 'react-hot-toast';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import { PAGES_NAME } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import Form from '../../components/Form/Form';

import { useContextContract } from '../../Context';
import OperationStatus from '../../components/OperationStatus/OperationStatus';
import { result, resultType } from '../../utils/formating';
import { useContractReadData } from '../../utils/hooks/ContractHooks/useCustomContractRead';
// import { useContractReadData } from '../../utils/hooks/useCustomContractRead';

const ClaimRewards = () => {
  const { availableRewards } = useContractReadData({});
  const { writeContractData } = useContextContract();

  const { maxType } = resultType;
  const handleSubmit = event => {
    event.preventDefault();

    if (availableRewards !== 0) {
      writeContractData({ functionName: 'claimReward', value: result(maxType, availableRewards) });
    } else {
      toast.error('you have no rewards');
    }
  };

  return (
    <PagesContainer>
      <div>
        <PagesHead>
          <h2>{PAGES_NAME.rewards}</h2>
        </PagesHead>
        <Form onSubmit={handleSubmit} id={PAGES_NAME.rewards}>
          <Available available={availableRewards} formatDecimal={4} />
        </Form>
      </div>
      <OperationStatus media="mobile" />
      <Button typeButton="submit" form={PAGES_NAME.rewards}>
        {PAGES_NAME.rewards}
      </Button>
    </PagesContainer>
  );
};

export default ClaimRewards;
