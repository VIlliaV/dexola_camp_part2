import { CONTRACT_INFO } from '../constants/contractInfo';
const { balance, apr, day, rewards } = CONTRACT_INFO;

export const formatDecimalPlaces = (data, quantity = 2) => {
  return data.toFixed(quantity);
};

export const formatApproximately = data => {
  return `≈${data}%`;
};

//? переробити на світч////////////////

export const result = (type, data) => {
  if (type === balance) {
    return formatDecimalPlaces(data);
  } else if (type === apr) {
    return formatApproximately(data);
  } else if (type === day) {
    return data;
  } else if (type === rewards) {
    return data;
  } else {
    return data;
  }
};
