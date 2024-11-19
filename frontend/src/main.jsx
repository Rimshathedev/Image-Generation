import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Screens/Login.jsx';
import Dashboard from './Screens/Dashboard.jsx';
import Entry from './Screens/Entry.jsx';
import SignUp from './Screens/SignUP.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Entry/>,
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/dashboard",
    element: <Dashboard/>
  },{
    path:"/signup",
    element: <SignUp/>
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
