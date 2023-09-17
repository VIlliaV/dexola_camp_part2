import { ErrorMessageStyled } from './ErrorMessage.styled';

const ErrorMessage = ({ children }) => {
  if (!children) {
    children = '\u00a0';
  }
  return <ErrorMessageStyled>{children}</ErrorMessageStyled>;
};

export default ErrorMessage;
