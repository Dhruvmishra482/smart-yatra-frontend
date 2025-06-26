// import { useAuth } from "../../../../context/AuthContext";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { auth } = useAuth();

//   // Jab tak loading hai, kuch mat dikhao (ya loading spinner dikha sakta hai)
//   if (auth.loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

//   // Agar token nahi mila ya user nahi mila, toh Login page pe bhej do
//   if (!auth.token || !auth.user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Agar allowedRoles diye gaye hain (jaise ["admin"]), toh check karo user allowed hai ya nahi
//   if (allowedRoles && !allowedRoles.includes(auth.user.accountType)) {
//     return <Navigate to="/" replace />;
//   }

//   // Agar sab valid hai, toh children component return karo (ye actual page hai)
//   return children;
// };

// export default ProtectedRoute;

// src/components/core/Auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext"; // सही path

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { loading, token, user } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium text-gray-600">
        Loading...
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

if (
  allowedRoles &&
  !allowedRoles.includes(user.accountType)  
) {
  return <Navigate to="/" replace />;
}

 
  return children;
};

export default ProtectedRoute;
