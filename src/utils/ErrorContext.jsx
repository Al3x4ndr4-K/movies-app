import { createContext, useContext, useState } from 'react';

// Создаём контекст
const ErrorContext = createContext();

// Хук для удобного доступа к контексту
export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
};
