import { useEffect, useState } from 'react';

import { getValidGuestSession } from '../api/apiConfig.jsx';

export const useGuestSession = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeGuestSession = async () => {
      try {
        const guestSessionId = await getValidGuestSession();
        if (!guestSessionId) {
          setError('Не удалось инициализировать гостевую сессию');
        }
      } catch {
        setError('Ошибка при создании гостевой сессии');
      }
    };

    initializeGuestSession();
  }, []);

  return { error };
};

export default useGuestSession;
