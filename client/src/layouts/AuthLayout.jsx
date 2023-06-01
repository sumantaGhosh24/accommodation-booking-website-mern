import {Outlet} from "react-router-dom";

import {AuthFooter, AuthHeader} from "../components";

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
