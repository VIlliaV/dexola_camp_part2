import { INPUT_INFO, PAGES_NAME } from '../constants/constants';

export const inputInfo = typeInput => {
  if (typeInput === PAGES_NAME.stakePage) return INPUT_INFO.stake;
  if (typeInput === PAGES_NAME.withdrawPage) return INPUT_INFO.withdraw;
  return INPUT_INFO.initial;
};
