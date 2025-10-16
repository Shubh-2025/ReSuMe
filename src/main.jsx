import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';

import App from './App.jsx';
import Navbar from './Navbar';
import Create from './Create';
import Preview from './Preview';
import Auth from './Auth.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "", 
        element: (
          <>
            <Navbar />
            <Create />
          </>
        ),
      },
    ],
  },
  {
    path : "preview",
    element : <Preview/>
  },
  {
    path:"auth",
    element:<Auth/>
  }
]);

export default router;


createRoot(document.getElementById('root')).render(
  <StrictMode >
    <RouterProvider router={router} />
  </StrictMode>,
)
