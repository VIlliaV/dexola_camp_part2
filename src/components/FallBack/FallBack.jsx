import { SvgPending } from '../../styles/styledConst/svgStyled';
import Backdrop from '../Backdrop/Backdrop';
import { FallBackStyled } from './FallBack.styled';

const FallBack = () => {
  return (
    <FallBackStyled>
      <Backdrop />
      <SvgPending className="fallback" />
    </FallBackStyled>
  );
};

export default FallBack;
