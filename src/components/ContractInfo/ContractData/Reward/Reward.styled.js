import styled from 'styled-components';

export const RewardStyled = styled.p`
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  white-space: nowrap;
  flex: 0;
`;

export const RewardValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: normal;
  color: var(--primary);
`;

export const RewardUnit = styled.span`
  font-size: 12px;
  letter-spacing: normal;
  text-transform: uppercase;
  color: var(--primary);
`;
