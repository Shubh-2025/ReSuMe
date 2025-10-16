import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';

import App from './App.jsx';
import Navbar from './Navbar';
import Create from './Create';
import Footer from './Footer.jsx';
import Preview from './Preview';
import Auth from './Auth.jsx';

const router = createBrowserRouter([
  {
    path: "/canvas",
    element: <App />,
    children: [
      {
        path: "", 
        element: (
          <div className="flex flex-col">
            <Navbar />
            <Create />
            <Footer />
          </div>
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
