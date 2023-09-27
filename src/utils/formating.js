export const formatDecimalPlaces = (data, quantity = 2) => {
  return data.toFixed(quantity);
};

export const formatApproximately = data => {
  const formatData = formatDecimalPlaces(data, 0);
  return `≈${formatData}%`;
};

export const resultType = {
  minType: 'min',
  maxType: 'max',
  dateType: 'date',
  approxType: 'approx',
  mobileType: 'mobile',
};

export const result = (type, data) => {
  if (type === resultType.maxType) {
    return data < 10
      ? formatDecimalPlaces(data, 4)
      : data < 1000
      ? formatDecimalPlaces(data)
      : formatDecimalPlaces(data, 0);
  } else if (type === resultType.approxType) {
    return formatApproximately(data);
  } else if (type === resultType.dateType) {
    return formatDecimalPlaces(data, 0);
  } else if (type === resultType.minType) {
    return data < 10
      ? formatDecimalPlaces(data, 4)
      : data > 100
      ? formatDecimalPlaces(data, 0)
      : formatDecimalPlaces(data);
  } else if (type === resultType.mobileType) {
    return data < 10 ? formatDecimalPlaces(data) : formatDecimalPlaces(data, 0);
  } else {
    return data;
  }
};

export function formatAddress(address) {
  return `${address.substring(0, 16)}...`;
}
