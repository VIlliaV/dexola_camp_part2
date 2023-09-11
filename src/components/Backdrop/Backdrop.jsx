import { BackdropStyled } from './Backdrop.styled';

const Backdrop = ({ className, onClick }) => {
  return <BackdropStyled className={className} onClick={onClick} />;
};

export default Backdrop;
