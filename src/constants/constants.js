export const CONTRACT_INFO = {
  balance: { text: 'Staked balance', tip: 'Staking rewards get \nallocated on this sum' },
  apr: { text: 'APR', tip: 'Displays the average for APR.\nInterest rate is calculated for each amount of tokens.' },
  days: { text: 'Days', tip: 'Days' },
  rewards: { text: 'Rewards', tip: 'Rewards get allocated \nevery second' },
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

export const StarRunnerTokenAddress = '0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83';
export const StarRunnerStakingAddress = '0x2F112ED8A96327747565f4d4b4615be8fb89459d';
