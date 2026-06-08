// AuthContext removed: authentication is disabled.
// This file is now a stub.
export function useAuth() { return { currentUser: null, userRole: null, loading: false }; }
export function AuthProvider({ children }) { return children; }
