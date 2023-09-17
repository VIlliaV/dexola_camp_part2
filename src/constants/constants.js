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
};

export const PAGES_NAME = {
  stake: 'Stake',
  withdraw: 'Withdraw',
  rewards: 'Claim rewards',
};
