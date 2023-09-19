import { useState } from 'react';
import { inputInfo } from '../../../../utils/inputInfo';
import { InputStyled } from './Input.styled';

const Input = ({ type, handleErrorMessage, errorMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const { nameInput, typeInput, placeholderInput, requiredInput } = inputInfo(type);

  const handleChange = event => {
    const value = event.target.value;
    setInputValue(value);
    // setUserData(typeInput, value);
    handleErrorMessage('');
  };

  const handleBlur = () => {
    if (!inputValue.trim()) {
      handleErrorMessage('Please complete this field');
      return;
    }
    //   if (typeInput === confirmPassword && userPassword !== value) handleErrorMessage('Passwords must match');

    //   if ((typeInput === confirmPassword || typeInput === password) && value.length < 3) {
    //     handleErrorMessage('Password must be at least 3 characters');
    //   }
    //   if (typeInput === email) {
    //     const { error } = validateEmailData(value);
    //     if (error) handleErrorMessage(error.message);
    //   }
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
