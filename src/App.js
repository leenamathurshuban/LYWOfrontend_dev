import * as React from "react";
import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import {router} from './routes/routes'


const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
