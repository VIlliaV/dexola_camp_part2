import { FormStyled } from './Form.styled';

const Form = ({ onSubmit, children, id = '' }) => {
  return (
    <FormStyled id={id} onSubmit={onSubmit}>
      {children}
    </FormStyled>
  );
};

export default Form;
