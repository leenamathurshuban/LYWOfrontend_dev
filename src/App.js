import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import {Login,Dashboard} from "../src/screens"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/Dashboard",
    element: <Dashboard/>,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
