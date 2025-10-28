import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
	const { isLoggedIn, login, logout, userType } = useContext(AuthContext);
	return { isLoggedIn, login, logout, userType };
};
