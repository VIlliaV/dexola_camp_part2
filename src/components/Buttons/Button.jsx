import { ButtonStyle } from './Button.styled';

const Button = ({ className = '', typeButton = 'button', disabled = false, onClick, children }) => {
  return (
    <ButtonStyle type={typeButton} className={className} disabled={disabled} onClick={onClick}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
