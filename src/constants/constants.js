import abiStaking from '@/dataBase/staking_abi.json';
import abiToken from '@/dataBase/token_abi.json';

export const CONTRACT_INFO = {
  stakedBalance: { text: 'Staked balance', tip: 'Staking rewards get \nallocated on this sum' },
  apr: { text: 'APR', tip: 'Displays the average for APR.\nInterest rate is calculated for each amount of tokens.' },
  days: { text: 'Days', tip: 'Days' },
  rewards: { text: 'Rewards', tip: 'Rewards get allocated \nevery second' },
};

export const CONTRACT_OPERATION = {
  stake: { operation: { stake: 'stake', approve: 'approve' } },

  withdraw: { operation: { withdraw: 'withdraw', withdrawAll: 'withdraw-exit' } },
  claim: {
    operation: { claim: 'claim' },
  },
  status: { preLoading: 'pre-loading', loading: 'loading', error: 'error', success: 'success' },
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
  stake: 'Stake',
  withdraw: 'Withdraw',
  rewards: 'Claim rewards',
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
