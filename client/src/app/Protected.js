import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {
 if (!isLoggedIn) {
   if(isLoggedIn === false && document.cookie !== "") {
      return window.location.reload()
   }
    return <Navigate to="/login" replace />;
 }
 return children;
};
export default Protected;