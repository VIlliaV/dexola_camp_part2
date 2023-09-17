import { INPUT_INFO, PAGES_NAME } from '../constants/constants';

export const inputInfo = typeInput => {
  if (typeInput === PAGES_NAME.stake) return INPUT_INFO.stake;
  return INPUT_INFO.initial;
};
