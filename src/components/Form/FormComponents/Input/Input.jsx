import { useState } from 'react';
import { inputInfo } from '../../../../utils/inputInfo';
import { InputStyled } from './Input.styled';
import { validateData } from '../../../../utils/validation';

const Input = ({ type, handleErrorMessage, errorMessage, formValue, maxAllowed }) => {
  const [inputValue, setInputValue] = useState('');
  const { nameInput, typeInput, placeholderInput, requiredInput } = inputInfo(type);

  const handleChange = event => {
    const value = event.target.value;
    console.log('🚀 ~ value:', value);

    const { error } = validateData(value, maxAllowed);
    if (!error || error?.details[0].type === 'any.required') {
      setInputValue(value);
      formValue(value);
      handleErrorMessage(undefined);
    } else handleErrorMessage(error.message);
  };

  const handleBlur = () => {
    const { error } = validateData(inputValue, maxAllowed);
    if (error) handleErrorMessage(error.message);
  };
  return (
    <InputStyled
      type={typeInput}
      name={nameInput}
      placeholder={placeholderInput}
      required={requiredInput}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      $errorMessage={errorMessage}
      aria-label={nameInput}
      // onFocus={handleFocus}
    />
  );
};

export default Input;
