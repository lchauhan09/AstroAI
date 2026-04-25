import { useAuthContext } from "./AuthContext";

/**
 * Standard hook for components to access authentication state.
 * Now acts as a proxy to the global AuthProvider.
 */
export function useAuth() {
  const context = useAuthContext();
  
  return {
    user: context.user,
    loading: context.loading,
    login: context.login,
    register: context.register,
    logout: context.logout,
    loadUser: context.loadUser,
    loginWithGoogle: context.loginWithGoogle,
  };
}
