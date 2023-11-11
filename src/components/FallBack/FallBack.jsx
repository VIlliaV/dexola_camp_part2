import { BackdropStyled } from '../../styles/styledConst/componentStyled';
import { FallBackStyled, SvgPendingFallBack } from './FallBack.styled';

const FallBack = () => {
  return (
    <FallBackStyled>
      <BackdropStyled />
      <SvgPendingFallBack />
    </FallBackStyled>
  );
};

export default FallBack;
