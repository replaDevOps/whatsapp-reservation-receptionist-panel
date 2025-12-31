import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ForgotPassword, LoginPage } from '../pages';
import { Fallback } from './Fallback';
import ProtectedRoute from './Protected';
import { useAuth } from '../context';
const Entry = lazy(() => import('../pages/Sidebar/index.jsx'))

// const isLoggedIn = () => !!localStorage.getItem('accessToken')

// const ProtectedRoute = ({ children }) => {
//   const location = useLocation()
//   if (!isLoggedIn()) {
//     return <Navigate to='/login' state={{ from: location }} replace />
//   }
//   return children
// }

// const RouteF = () => {
//   return (
//     <Suspense fallback={<Fallback />}>
//       <Routes>
//         {/* Protected */}
//         <Route
//           path='/*'
//           element={
//             <ProtectedRoute>
//               <Sidebar />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/login'
//           element={
//               <LoginPage />
//           }
//         />
//         <Route
//           path='/forgotpassword'
//           element={
//               <ForgotPassword />
//           }
//         />

//         {/* Fallback */}
//         <Route
//           path='*'
//           element={isLoggedIn() ? <Navigate to='/' replace /> : <Navigate to='/login' replace />}
//         />
//       </Routes>
//     </Suspense>
//   )
// }


const RouteF = () => {
  const { isAuth } = useAuth();

  return (
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              {/* <Sidebar /> */}
              <Suspense fallback={<Fallback />}>
                <Entry />
              </Suspense>
            </ProtectedRoute>
            
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <Route
          path="*"
          element={<Navigate to={isAuth ? '/' : '/login'} replace />}
        />
      </Routes>
  );
};



export default RouteF