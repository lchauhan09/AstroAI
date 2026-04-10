import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { endpoints } from '../lib/api';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('astroai_token');
      if (token) {
        try {
          const res = await api.get(endpoints.auth.me);
          setUser(res.data);
        } catch (err) {
          localStorage.removeItem('astroai_token');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (credentials: any) => {
    const res = await api.post(endpoints.auth.login, credentials);
    const { access_token } = res.data;
    localStorage.setItem('astroai_token', access_token);
    const userRes = await api.get(endpoints.auth.me);
    setUser(userRes.data);
  };

  const logout = () => {
    localStorage.removeItem('astroai_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
