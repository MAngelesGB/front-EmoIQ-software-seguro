import { createContext, useContext, useMemo, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { useCookies } from 'react-cookie';
import { auth, getIdTokenResult } from '../config/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['user']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        try {
          const idTokenResult = await getIdTokenResult(currentUser);
          const token = await currentUser.getIdToken();
          const { role } = idTokenResult.claims;
          setCookie(
            'user',
            { token, role, uid: idTokenResult.claims.user_id },
            { path: '/' },
          );
        } catch (error) {
          console.error('Error fetching custom claims:', error);
        }
      } else {
        setCookie('user', null, { path: '/' });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setCookie]);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  const value = useMemo(
    () => ({
      signup,
      login,
      user: cookies.user,
      logout,
      loading,
    }),
    [cookies.user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('There is no Auth provider');
  return context;
};
