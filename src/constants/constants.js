import abiStaking from '@/dataBase/staking_abi.json';
import abiToken from '@/dataBase/token_abi.json';

export const CONTRACT_OPERATION = {
  status: { loading: 'loading', error: 'error', success: 'success' },
  stake: {
    functionName: 'stake',
    statusText: {
      loading: { first: 'Adding', second: 'to Staking' },
      success: { first: '', second: 'added to Staking' },
    },
  },
  approve: {
    functionName: 'approve',
    statusText: {
      loading: { first: 'Approving', second: '' },
      success: { first: '', second: 'approved' },
    },
  },
  withdraw: {
    functionName: 'withdraw',
    statusText: {
      loading: { first: 'Withdrawing', second: 'from Staking' },
      success: { first: '', second: 'withdraw from Staking' },
    },
  },
  exit: {
    functionName: 'exit',
    statusText: {
      loading: { first: 'Withdrawing all & Claiming rewards', second: '' },
      success: { first: '', second: 'Withdraw all & Claim rewards' },
    },
  },
  claimReward: {
    functionName: 'claimReward',
    statusText: {
      loading: { first: 'Claiming', second: 'rewards' },
      success: { first: '', second: 'claim rewards' },
    },
  },
};

export const INPUT_INFO = {
  initial: {
    nameInput: '',
    typeInput: 'text',
    placeholderInput: 'Enter something',
    requiredInput: false,
  },
  stake: {
    nameInput: 'stake',
    typeInput: 'text',
    placeholderInput: 'Enter stake amount',
    requiredInput: true,
  },
  withdraw: {
    nameInput: 'withdraw',
    typeInput: 'text',
    placeholderInput: 'Enter withdraw amount',
    requiredInput: true,
  },
};

export const PAGES_NAME = {
  stake: 'stake',
  withdraw: 'withdraw',
  rewards: 'claim rewards',
};

export const STAR_RUNNER_TOKEN_ADDRESS = '0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83';

export const STAR_RUNNER_STAKING_ADDRESS = '0x2F112ED8A96327747565f4d4b4615be8fb89459d';

export const STAR_RUNNER_STAKING_CONTRACT = {
  address: STAR_RUNNER_STAKING_ADDRESS,
  abi: abiStaking,
};

export const STAR_RUNNER_TOKEN_CONTRACT = {
  address: STAR_RUNNER_TOKEN_ADDRESS,
  abi: abiToken,
};
