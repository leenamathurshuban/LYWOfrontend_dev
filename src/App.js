import * as React from "react";
import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import {router} from './routes/routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
   <>
   
   <RouterProvider router={router} />
   <ToastContainer />
   </>
  );
};

export default App;
