import { resultType } from '../../formating';
import { useContractReadData } from './useCustomContractRead';

const useStats = () => {
  const { stakedBalance, apr, days, availableRewards } = useContractReadData({});
  const { dateType, approxType, maxType, minType } = resultType;

  const statsName = { balance: 'Staked balance', apr: 'APR', days: 'Days', rewards: 'Rewards' };

  const contractStats = [
    {
      text: statsName.balance,
      tip: { first: 'Staking rewards get ', second: 'allocated on this sum' },
      value: stakedBalance,
      type: maxType,
    },
    {
      text: statsName.apr,
      tip: {
        first: 'Displays the average for APR. ',
        second: 'Interest rate is calculated for each amount of tokens.',
      },
      value: apr,
      type: approxType,
    },
    {
      text: statsName.days,
      tip: { first: 'Days', second: '' },
      value: days,
      type: dateType,
    },
    {
      text: statsName.rewards,
      tip: { first: 'Rewards get allocated ', second: 'every second' },
      value: availableRewards,
      type: minType,
    },
  ];

  return { contractStats, statsName };
};

export { useStats };
