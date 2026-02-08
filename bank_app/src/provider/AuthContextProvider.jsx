import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);


const registeredUsers = new Map([
  ["admin@test.com", { id: 1, name: "Admin User", email: "admin@test.com", password: "password", role: "admin" }],
  ["user@test.com", { id: 2, name: "Regular User", email: "user@test.com", password: "password", role: "user" }],
]);

const authService = {
  login: async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const user = registeredUsers.get(email);
    if (user && user.password === password) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new Error("Invalid email or password");
  },
  
  signup: async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (registeredUsers.has(userData.email)) {
      throw new Error("Email already registered");
    }
    
    const newId = Math.max(...registeredUsers.values().map(u => u.id)) + 1;
    const newUser = {
      id: newId,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      password: userData.password,
      address: userData.address || "",
      role: "user"
    };
    registeredUsers.set(userData.email, newUser);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },
  
  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for stored session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const userData = await authService.login(email, password);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  };

  const signup = async (signupData) => {
    const userData = await authService.signup(signupData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}