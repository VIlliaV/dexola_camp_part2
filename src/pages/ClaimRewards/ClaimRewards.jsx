import Button from '../../components/Buttons/Button';
import Available from '../../components/ContractInfo/ContractData/Available/Available';
import { PAGES_NAME, STAR_RUNNER_STAKING_CONTRACT } from '../../constants/constants';
import { PagesContainer, PagesHead } from '../Pages.styled';
import { useContractRead, useAccount } from 'wagmi';

const ClaimRewards = () => {
  const { address } = useAccount();
  const { data: availableRewards } = useContractRead({
    ...STAR_RUNNER_STAKING_CONTRACT,
    functionName: 'earned',
    args: [address],
    // chainId: 11155111,
  });
  const available = Number(availableRewards);
  return (
    <PagesContainer>
      <div>
        <PagesHead>
          <h2>{PAGES_NAME.rewards}</h2>
        </PagesHead>
        <Available available={available} />
      </div>
      <Button typeButton="submit" form={PAGES_NAME.rewards}>
        {PAGES_NAME.rewards}
      </Button>
    </PagesContainer>
  );
};

export default ClaimRewards;
