import { User } from '@/types/user';
import { ReactNode, createContext, useContext, useState } from 'react';

const useUserController = () => {
  const [userData, setUserData] = useState<User>({} as User);

  return {
    userData,
    setUserData
  };
};

const UserContext = createContext<ReturnType<typeof useUserController>>({
  userData: {} as User,
  setUserData: () => {}
});

export const UserProvier = ({ children }: { children: ReactNode }) => (
  <UserContext.Provider value={useUserController()}>{children}</UserContext.Provider>
);

export const useUser = () => useContext(UserContext);
