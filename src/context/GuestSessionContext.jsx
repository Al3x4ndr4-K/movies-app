import { createContext, useEffect, useState } from 'react';

import { getValidGuestSession } from '../api/apiConfig.jsx';
import ShowErrorNotification from '../notifications/ShowErrorNotification.jsx';

export const GuestSessionContext = createContext();

export const GuestSessionProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getValidGuestSession();
        if (typeof session === 'string') {
          setSessionId(session);
        } else {
          ShowErrorNotification('Некорректный sessionId');
        }
      } catch (err) {
        ShowErrorNotification('Ошибка гостевой сессии');
      }
    };

    fetchSession();
  }, []);

  return <GuestSessionContext.Provider value={{ sessionId }}>{children}</GuestSessionContext.Provider>;
};
