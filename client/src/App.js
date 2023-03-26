import React from "react";
import {Routes, Route} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import {AuthLayout, Layout, Public} from "./components";
import {
  Dashboard,
  Login,
  PersistLogin,
  Profile,
  Register,
  RequireAdmin,
  RequireUser,
  RequireGuest,
  Welcome,
} from "./features/auth";
import {
  AdminBookingList,
  AdminEditBooking,
  AdminHotelBooking,
  Bookings,
} from "./features/booking";
import {AdminCategoryList, AdminEditCategory} from "./features/category";
import {
  AdminEditHotel,
  AdminHotelList,
  AdminNewHotel,
  Hotel,
  Hotels,
} from "./features/hotel";
import {AdminRatingList, Rating, Ratings} from "./features/rating";
import {AdminDetailUser, AdminUsersList} from "./features/user";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route index element={<Public />} />
        <Route path="register" element={<Register />} />
        <Route element={<PersistLogin />}>
          <Route element={<AuthLayout />}>
            {/* user routes */}
            <Route path="welcome" element={<RequireUser elm={<Welcome />} />} />
            <Route path="profile" element={<RequireUser elm={<Profile />} />} />
            <Route path="hotels">
              <Route index element={<RequireUser elm={<Hotels />} />} />
              <Route path=":id" element={<RequireUser elm={<Hotel />} />} />
            </Route>
            <Route path="ratings">
              <Route index element={<RequireUser elm={<Ratings />} />} />
              <Route path=":id" element={<RequireUser elm={<Rating />} />} />
            </Route>
            <Route path="booking">
              <Route index element={<RequireUser elm={<Bookings />} />} />
            </Route>

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
                path=":id"
                element={<RequireAdmin elm={<AdminEditCategory />} />}
              />
            </Route>
            <Route path="admin-hotel">
              <Route
                index
                element={<RequireAdmin elm={<AdminHotelList />} />}
              />
              <Route
                path=":id"
                element={<RequireAdmin elm={<AdminEditHotel />} />}
              />
              <Route
                path="new"
                element={<RequireAdmin elm={<AdminNewHotel />} />}
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
                element={<RequireAdmin elm={<AdminEditBooking />} />}
              />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
