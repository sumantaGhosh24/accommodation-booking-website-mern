import React from "react";
import {Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import {Layout, AuthLayout} from "./layouts";
import {
  Public,
  Login,
  Register,
  Welcome,
  Profile,
  MyRatings,
  MyBookings,
  Dashboard,
  AdminUsersList,
  AdminDetailUser,
  AdminCategoryList,
  AdminCreateCategory,
  AdminUpdateCategory,
  AdminHotelList,
  AdminBookingList,
  AdminHotelBooking,
  AdminRatingList,
  AdminUpdateBooking,
  AdminUpdateHotel,
  HotelDetailed,
  AdminCreateHotel,
} from "./pages";
import {PersistLogin, RequireUser, RequireAdmin} from "./components";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<PersistLogin />}>
            <Route element={<AuthLayout />}>
              {/* user routes */}
              <Route
                path="welcome"
                element={<RequireUser elm={<Welcome />} />}
              />
              <Route
                path="profile"
                element={<RequireUser elm={<Profile />} />}
              />
              <Route
                path="my-ratings"
                element={<RequireUser elm={<MyRatings />} />}
              />
              <Route
                path="my-booking"
                element={<RequireUser elm={<MyBookings />} />}
              />
              <Route
                path="hotel/:id"
                element={<RequireUser elm={<HotelDetailed />} />}
              />

              {/* admin routes */}
              <Route
                path="dashboard"
                element={<RequireAdmin elm={<Dashboard />} />}
              />
              <Route path="admin-users">
                <Route
                  index
                  element={<RequireAdmin elm={<AdminUsersList />} />}
                />
                <Route
                  path=":id"
                  element={<RequireAdmin elm={<AdminDetailUser />} />}
                />
              </Route>
              <Route path="admin-category">
                <Route
                  index
                  element={<RequireAdmin elm={<AdminCategoryList />} />}
                />
                <Route
                  path="new"
                  element={<RequireAdmin elm={<AdminCreateCategory />} />}
                />
                <Route
                  path=":id"
                  element={<RequireAdmin elm={<AdminUpdateCategory />} />}
                />
              </Route>
              <Route path="admin-hotel">
                <Route
                  index
                  element={<RequireAdmin elm={<AdminHotelList />} />}
                />
                <Route
                  path=":id"
                  element={<RequireAdmin elm={<AdminUpdateHotel />} />}
                />
                <Route
                  path="new"
                  element={<RequireAdmin elm={<AdminCreateHotel />} />}
                />
              </Route>
              <Route
                path="admin-rating"
                element={<RequireAdmin elm={<AdminRatingList />} />}
              />
              <Route path="admin-booking">
                <Route
                  index
                  element={<RequireAdmin elm={<AdminBookingList />} />}
                />
                <Route
                  path="hotel/:hotel"
                  element={<RequireAdmin elm={<AdminHotelBooking />} />}
                />
                <Route
                  path=":id"
                  element={<RequireAdmin elm={<AdminUpdateBooking />} />}
                />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
