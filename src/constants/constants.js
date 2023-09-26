import abiStaking from '@/dataBase/staking_abi.json';
import abiToken from '@/dataBase/token_abi.json';
import { resultType } from '../utils/formating';
const { dateType, approxType, maxType, minType } = resultType;
export const CONTRACT_INFO = {
  stakedBalance: { text: 'Staked balance', tip: 'Staking rewards get \nallocated on this sum', type: maxType },
  apr: {
    text: 'APR',
    tip: 'Displays the average for APR.\nInterest rate is calculated for each amount of tokens.',
    type: approxType,
  },
  days: { text: 'Days', tip: 'Days', type: dateType },
  rewards: { text: 'Rewards', tip: 'Rewards get allocated \nevery second', type: minType },
};

export const CONTRACT_OPERATION = {
  status: { preLoading: 'preLoading', loading: 'loading', error: 'error', success: 'success' },
  stake: {
    operation: 'stake',
    statusText: {
      loading: { first: 'Adding', second: 'to Staking' },
      preLoading: { first: 'Adding', second: 'to Staking' },
      success: { first: '', second: 'added to Staking' },
    },
  },
  approve: {
    operation: 'approve',
    statusText: {
      loading: { first: 'Approving', second: '' },
      preLoading: { first: 'Approving', second: '' },
      success: { first: '', second: 'approved' },
    },
  },
  withdraw: {
    operation: 'withdraw',
    statusText: {
      loading: { first: 'Withdrawing', second: 'from Staking' },
      preLoading: { first: 'Withdrawing', second: 'from Staking' },
      success: { first: '', second: 'withdraw from Staking' },
    },
  },
  withdrawAll: {
    operation: 'withdrawAll',
    statusText: {
      loading: { first: 'Withdrawing all & Claiming rewards', second: '' },
      preLoading: { first: 'Withdrawing all & Claiming rewards', second: '' },
      success: { first: '', second: 'Withdraw all & Claim rewards' },
    },
  },
  claim: {
    operation: 'claim',
    statusText: {
      loading: { first: 'Claiming', second: 'rewards' },
      preLoading: { first: 'Claiming', second: 'rewards' },
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
