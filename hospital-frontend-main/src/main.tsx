import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import ViewInteractions from './components/ViewInteractions.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/:id",
    element: <App></App>,
  },
  {
    path: "/viewInteractions",
    element: <ViewInteractions></ViewInteractions>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
