import { createContext, useEffect, useState } from 'react';

import { getValidGuestSession } from '../api/apiConfig.jsx';

export const GuestSessionContext = createContext();

export const GuestSessionProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getValidGuestSession();
        setSessionId(session);
      } catch (err) {
        setError('Ошибка гостевой сессии');
      }
    };

    fetchSession();
  }, []);

  return <GuestSessionContext.Provider value={{ sessionId, error }}>{children}</GuestSessionContext.Provider>;
};
