import { AvailableData, AvailableStyled, AvailableUnit, AvailableValue } from './Available.styled';

const Available = ({ available = 0, tokenName = 'STRU' }) => {
  return (
    <AvailableStyled>
      Available:
      <AvailableData>
        <AvailableValue>{available} </AvailableValue>
        <AvailableUnit>{tokenName}</AvailableUnit>
      </AvailableData>
    </AvailableStyled>
  );
};

export default Available;
