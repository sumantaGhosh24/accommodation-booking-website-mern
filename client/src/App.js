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
  AdminDetailBooking,
  AdminEditBooking,
  AdminHotelBooking,
  AdminNewBooking,
  Booking,
  Bookings,
  DetailsBooking,
  EditBooking,
  NewBooking,
} from "./features/booking";
import {
  AdminCategoryList,
  AdminEditCategory,
  AdminNewCategory,
} from "./features/category";
import {
  AdminDetailHotel,
  AdminEditHotel,
  AdminHotelList,
  AdminNewHotel,
  Hotel,
  Hotels,
} from "./features/hotel";
import {AdminRatingList, NewRating, Rating, Ratings} from "./features/rating";
import {AdminDetailUser, AdminEditUser, AdminUsersList} from "./features/user";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<RequireGuest elm={<Login />} />} />
        <Route index element={<RequireGuest elm={<Public />} />} />
        <Route path="register" element={<RequireGuest elm={<Register />} />} />
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
              <Route index element={<RequireUser elm={<Rating />} />} />
              <Route
                path="rating"
                element={<RequireUser elm={<Ratings />} />}
              />
              <Route path="new" element={<RequireUser elm={<NewRating />} />} />
            </Route>
            <Route path="booking">
              <Route index element={<RequireUser elm={<Booking />} />} />
              <Route
                path="booking"
                element={<RequireUser elm={<Bookings />} />}
              />
              <Route
                path=":id"
                element={<RequireUser elm={<EditBooking />} />}
              />
              <Route
                path="detail/:id"
                element={<RequireUser elm={<DetailsBooking />} />}
              />
              <Route
                path="new"
                element={<RequireUser elm={<NewBooking />} />}
              />
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
                element={<RequireAdmin elm={<AdminEditUser />} />}
              />
              <Route
                path="detail/:id"
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
              <Route
                path=":new"
                element={<RequireAdmin elm={<AdminNewCategory />} />}
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
                path="detail/:id"
                element={<RequireAdmin elm={<AdminDetailHotel />} />}
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
                path=":hotel"
                element={<RequireAdmin elm={<AdminHotelBooking />} />}
              />
              <Route
                path=":id"
                element={<RequireAdmin elm={<AdminEditBooking />} />}
              />
              <Route
                path="detail/:id"
                element={<RequireAdmin elm={<AdminDetailBooking />} />}
              />
              <Route
                path="new"
                element={<RequireAdmin elm={<AdminNewBooking />} />}
              />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
