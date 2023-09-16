import styled from 'styled-components';

export const PagesHead = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--secondary);
  }
`;
