import { AvailableData, AvailableStyled, AvailableUnit, AvailableValue } from './Available.styled';

const Available = () => {
  const available = 354;
  const unit = 'STRU';
  return (
    <AvailableStyled>
      Available:
      <AvailableData>
        <AvailableValue>{available} </AvailableValue>
        <AvailableUnit>{unit}</AvailableUnit>
      </AvailableData>
    </AvailableStyled>
  );
};

export default Available;
