import { useState } from 'react';

import { LabelStyled } from './Label.styled';
import Input from '../Input/Input';
import ErrorMessage from '../ErrorMesage/ErrorMessage';

const Label = props => {
  const [errorMessage, setErrorMessage] = useState();

  const handleErrorMessage = message => {
    setErrorMessage(message);
  };

  return (
    <LabelStyled>
      <Input errorMessage={errorMessage} {...props} handleErrorMessage={handleErrorMessage} />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </LabelStyled>
  );
};

export default Label;
