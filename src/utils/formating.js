import { CONTRACT_INFO } from '../constants/constants';

const { stakedBalance, apr, days, rewards } = CONTRACT_INFO;

export const formatDecimalPlaces = (data, quantity = 2) => {
  return data.toFixed(quantity);
};

export const formatApproximately = data => {
  const formatData = formatDecimalPlaces(data, 0);
  return `≈${formatData}%`;
};

//? переробити на світч////////////////

export const result = (type, data) => {
  if (type === stakedBalance) {
    return data < 10
      ? formatDecimalPlaces(data, 4)
      : data < 1000
      ? formatDecimalPlaces(data)
      : formatDecimalPlaces(data, 0);
  } else if (type === apr) {
    return formatApproximately(data);
  } else if (type === days) {
    return formatDecimalPlaces(data, 0);
  } else if (type === rewards) {
    // console.log('🚀 ~ rewards:', rewards);
    return data < 10
      ? formatDecimalPlaces(data, 4)
      : data > 100
      ? formatDecimalPlaces(data, 0)
      : formatDecimalPlaces(data);
  } else {
    return data;
  }
};

export function formatAddress(address) {
  return `${address.substring(0, 16)}...`;
}
