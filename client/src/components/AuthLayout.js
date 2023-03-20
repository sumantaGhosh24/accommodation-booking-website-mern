import {Outlet} from "react-router-dom";

import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";

const AuthLayout = () => {
  return (
    <>
      <AuthHeader />
      <Outlet />
      <AuthFooter />
    </>
  );
};

export default AuthLayout;
