import { useContextContract } from '../../../../Context';
import { formatDecimalPlaces } from '@/utils/formating';
import { AvailableData, AvailableStyled, AvailableUnit, AvailableValue } from './Available.styled';

const Available = ({ available = 0, formatDecimal = 0 }) => {
  const availableFormatting = formatDecimalPlaces(available, formatDecimal);
  const { symbol } = useContextContract();

  return (
    <AvailableStyled>
      Available:
      <AvailableData>
        <AvailableValue>{availableFormatting} </AvailableValue>
        <AvailableUnit>{symbol}</AvailableUnit>
      </AvailableData>
    </AvailableStyled>
  );
};

export default Available;
