// hooks/useSignOut.js
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

const useSignOut = () => {
  useEffect(() => {
    signOut({ redirect: false });
  }, []);
};

export default useSignOut;
