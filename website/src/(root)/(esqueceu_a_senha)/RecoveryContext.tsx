import React, { createContext, useState, useContext, ReactNode } from 'react';

interface RecoveryContextProps {
  email: string;
  setEmail: (email: string) => void;
  otp: number | null;
  setOtp: (otp: number) => void;
}

interface RecoveryProviderProps {
  children: ReactNode;
}

const RecoveryContext = createContext<RecoveryContextProps | undefined>(undefined);

export const RecoveryProvider: React.FC<RecoveryProviderProps> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<number | null>(null);

  return (
    <RecoveryContext.Provider value={{ email, setEmail, otp, setOtp }}>
      {children}
    </RecoveryContext.Provider>
  );
};

export const useRecoveryContext = () => {
  const context = useContext(RecoveryContext);
  if (!context) {
    throw new Error('useRecoveryContext must be used within a RecoveryProvider');
  }
  return context;
};
