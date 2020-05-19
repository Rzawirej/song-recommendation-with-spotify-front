import React from "react";
import { Redirect } from "react-router-dom";

// Route Views
import Register from "./views/Register";
import Login from "./views/Login";
import Event from "./views/Event";
import Settings from "./views/Settings";

export default [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/settings" />
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/event",
    component: Event
  },
  {
    path: "/settings",
    component: Settings
  }
];