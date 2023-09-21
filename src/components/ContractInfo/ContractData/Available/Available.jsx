import { formatDecimalPlaces } from '../../../../utils/formating';
import { AvailableData, AvailableStyled, AvailableUnit, AvailableValue } from './Available.styled';

const Available = ({ available = 0, tokenName = 'STRU', formatDecimal = 0 }) => {
  const availableFormating = formatDecimalPlaces(available, formatDecimal);
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
