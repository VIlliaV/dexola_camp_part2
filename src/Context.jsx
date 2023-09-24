import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ContractContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useContextContract = () => useContext(ContractContext);

export const Context = ({ children }) => {
  const [dataOperation, setDataOperation] = useState([]);

  const [valueForOperation, setValueForOperation] = useState('0');
  const memoOperation = useMemo(() => dataOperation, [dataOperation]);
  useEffect(() => {
    console.log(memoOperation);
  }, [memoOperation]);

  return (
    <ContractContext.Provider value={{ dataOperation, setDataOperation, valueForOperation, setValueForOperation }}>
      {children}
    </ContractContext.Provider>
  );
};
