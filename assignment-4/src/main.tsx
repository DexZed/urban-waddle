import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import SuspenseWrapper from "./layout/withSuspense.tsx";

const placeHolderImport= lazy(()=>import("./layout/withSuspense.tsx"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <div>Not Created</div>
          </SuspenseWrapper>
        ),
      },
      {
        path: "create-book",
        element: (
          <SuspenseWrapper>
            <div>Not Created</div>
          </SuspenseWrapper>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <SuspenseWrapper>
            <div>Not Created</div>
          </SuspenseWrapper>
        ),
      },
      {
        path: "borrow/:id",
        element: (
          <SuspenseWrapper>
            <div>Not Created</div>
          </SuspenseWrapper>
        ),
      },
      {
        path: "books/:id",
        element: (
          <SuspenseWrapper>
            <div>Not Created</div>
          </SuspenseWrapper>
        ),
      },
      {
        path: "borrow-summary",
        element: (
          <SuspenseWrapper>
            <div>Not Created</div>
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
