import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import jwtDecode from "jwt-decode";

import {selectCurrentToken} from "./authSlice";

const RequireGuest = ({elm}) => {
  const location = useLocation();
  const token = useSelector(selectCurrentToken);
  let content;

  if (token) {
    const decoded = jwtDecode(token);
    const {role} = decoded.UserInfo;
    content = (
      <Navigate
        to={role === "admin" ? "/dashboard" : "/welcome"}
        state={{from: location}}
        replace
      />
    );
  } else {
    content = elm;
  }

  return content;
};

export default RequireGuest;
