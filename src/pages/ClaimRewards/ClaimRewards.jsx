import toast from 'react-hot-toast';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import { CONTRACT_OPERATION, PAGES_NAME } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import Form from '../../components/Form/Form';

import { useContextContract } from '../../Context';
import OperationStatus from '../../components/OperationStatus/OperationStatus';
import { result, resultType } from '../../utils/formating';
import { useContractReadData } from '../../utils/hooks/ContractHooks/useCustomContractRead';
import { useEffect, useState } from 'react';

const ClaimRewards = () => {
  const [isClaim, setIsClaim] = useState(false);
  const { availableRewards } = useContractReadData({});
  const { dataOperation, writeContractData } = useContextContract();
  const { rewardsPage } = PAGES_NAME;
  const { functionName } = CONTRACT_OPERATION.claimReward;
  const { maxType } = resultType;

  useEffect(() => {
    setIsClaim(dataOperation.some(item => item.functionName === functionName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataOperation]);

  const handleSubmit = event => {
    event.preventDefault();

    if (availableRewards !== 0) {
      const value = result(maxType, availableRewards);
      writeContractData({ functionName, value });
    } else {
      toast.error('you have no rewards');
    }
  };

  return (
    <PagesContainer>
      <div>
        <PagesHead>
          <h2>{rewardsPage}</h2>
        </PagesHead>
        <Form onSubmit={handleSubmit} id={rewardsPage}>
          <Available available={availableRewards} formatDecimal={4} />
        </Form>
      </div>
      <OperationStatus media="mobile" />
      <Button typeButton="submit" form={rewardsPage} disabled={isClaim}>
        {rewardsPage}
      </Button>
    </PagesContainer>
  );
};

export default ClaimRewards;
