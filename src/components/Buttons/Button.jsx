import { ButtonStyle } from './Button.styled';

const Button = ({ className = '', typeButton = 'button', form = undefined, disabled = false, onClick, children }) => {
  return (
    <ButtonStyle type={typeButton} form={form} className={className} disabled={disabled} onClick={onClick}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
