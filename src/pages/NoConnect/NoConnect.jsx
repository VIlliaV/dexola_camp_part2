import ButtonConnect from '../../components/Buttons/ButtonConnect';
import { SvgNoConnect } from '../../styles/styledConst/svgStyled';
import { NoConnectStyled } from './NoConnect.styled';

const NoConnect = () => {
  return (
    <NoConnectStyled>
      <div className="no_connect_info">
        <SvgNoConnect />
        <p>
          To start staking you need <br />
          to connect you wallet first
        </p>
      </div>
      <ButtonConnect />
    </NoConnectStyled>
  );
};

export default NoConnect;
