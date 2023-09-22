import { ErrorMessageStyled } from './ErrorMessage.styled';

const ErrorMessage = ({ children = '\u00a0' }) => {
  return <ErrorMessageStyled>{children}</ErrorMessageStyled>;
};

export default ErrorMessage;
