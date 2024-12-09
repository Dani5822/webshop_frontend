const SESSION_KEY = 'user-session';

export const login = async (username: string, password: string): Promise<void> => {
  // Simulált API hívás (később helyettesíthető valódi backend endpointtal)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'user' && password === 'password') {
        // Token mentése a session-be
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username }));
        resolve();
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const register = async (username: string, password: string): Promise<void> => {
  // Simulált API hívás
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Egyszerű szimuláció: nem valódi adatbázis!
      if (username && password.length >= 6) {
        resolve();
      } else {
        reject(new Error('Invalid registration details'));
      }
    }, 1000);
  });
};


export const logout = (): void => {
  sessionStorage.removeItem(SESSION_KEY);
};

export const isLoggedIn = (): boolean => {
  return sessionStorage.getItem(SESSION_KEY) !== null;
};

export const getSession = (): { username: string } | null => {
  const sessionData = sessionStorage.getItem(SESSION_KEY);
  return sessionData ? JSON.parse(sessionData) : null;
};
