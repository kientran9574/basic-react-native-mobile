import { createContext, ReactNode, useContext, useState } from "react";

interface IAppContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: IUserLogin | null;
  setProfile: React.Dispatch<React.SetStateAction<IUserLogin | null>>;
  cart: ICart | Record<string, never>;
  setCart: (values: any) => void
}
const initialAppContext: IAppContext = {
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  profile: null,
  cart: {},
  setProfile: () => null,
  setCart: (values: any) => null,
};
const AppContext = createContext<IAppContext>(initialAppContext);
export const useAppContext = () => {
  return useContext(AppContext);
};
export default function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialAppContext.isAuthenticated
  );
  const [cart, setCart] = useState<ICart | Record<string, never>>(
    initialAppContext.cart
  );
  const [profile, setProfile] = useState<IUserLogin | null>(
    initialAppContext.profile
  );
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        cart,
        setCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
