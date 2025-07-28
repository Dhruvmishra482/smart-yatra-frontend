
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext"; // path

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
