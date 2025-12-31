// import { useEffect } from "react"
// import { isUnAuthorize } from "../shared"
// import { LoginPage } from "../pages/LoginPage"

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context";

// const Protected = ({ children }) => {

//     useEffect(()=>{
//         if(isUnAuthorize())
//             localStorage.clear()
//     },[])

//       if (isUnAuthorize()) {
//         return <LoginPage/>
    
//       }
//       return children
// }
// export default Protected;

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuth();
  const location = useLocation();
  if (isAuth) return <Navigate to="/" replace />
  return children;
};

export default ProtectedRoute;