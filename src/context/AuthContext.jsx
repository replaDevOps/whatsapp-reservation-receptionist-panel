// AuthContext.js
import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem("accessToken")
	);

	const [userType, setUserType] = useState("receptionist"); // Example user type state

	const login = (token) => {
		localStorage.setItem("accessToken", token);
		setUserType("receptionist"); // Set user type upon login
		localStorage.setItem("userType", userType); // Save user type to local storage
		setIsLoggedIn(true);
	};

	const logout = () => {
		localStorage.removeItem("accessToken");
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout, userType }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
