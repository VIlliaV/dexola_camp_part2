import { formatDecimalPlaces } from '../../../../utils/formating';
import { AvailableData, AvailableStyled, AvailableUnit, AvailableValue } from './Available.styled';

const Available = ({ available = 0, tokenName = 'STRU' }) => {
  const availableFormating = formatDecimalPlaces(available, 0);
  return (
    <AvailableStyled>
      Available:
      <AvailableData>
        <AvailableValue>{availableFormating} </AvailableValue>
        <AvailableUnit>{tokenName}</AvailableUnit>
      </AvailableData>
    </AvailableStyled>
  );
};

export default Available;
