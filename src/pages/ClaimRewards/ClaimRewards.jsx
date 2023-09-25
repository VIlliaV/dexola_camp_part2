import { formatEther } from 'viem';
import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import { PAGES_NAME, STAR_RUNNER_STAKING_CONTRACT } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { useContractRead, useAccount, useContractWrite } from 'wagmi';
import Form from '../../components/Form/Form';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router';
import { useContextContract } from '../../Context';

const ClaimRewards = () => {
  const { address } = useAccount();
  const { pathname } = useLocation();
  const { setDataOperation } = useContextContract();
  const { data: availableRewards = '0' } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'earned',
    args: [address],
    // chainId: 11155111,
  });

  const { write: writeRewards } = useContractWrite({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'claimReward',
    chainId: 11155111,
    // args: [parseEther(withdraw)],
  });
  const available = formatEther(availableRewards);

  const handleSubmit = event => {
    event.preventDefault();

    if (available !== '0') {
      setDataOperation(prev => {
        const arr = [...prev, { page: pathname, status: 'pre-loading', valueOperation: available, operation: 'claim' }];
        return arr;
      });
      writeRewards();
    } else {
      toast.error('у вас немає rewards');
    }
  };

  return (
    <PagesContainer>
      <div>
        <PagesHead>
          <h2>{PAGES_NAME.rewards}</h2>
        </PagesHead>
        <Form onSubmit={handleSubmit} id={PAGES_NAME.rewards}>
          <Available available={+available} formatDecimal={4} />
        </Form>
      </div>
      <Button typeButton="submit" form={PAGES_NAME.rewards}>
        {PAGES_NAME.rewards}
      </Button>
    </PagesContainer>
  );
};

export default ClaimRewards;
