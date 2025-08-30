import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import SuspenseWrapper from "./layout/withSuspense.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

const Library = lazy(() => import("./pages/Library.tsx"));
const CreateBook = lazy(() => import("./pages/CreateBook.tsx"));
const Borrow = lazy(() => import("./pages/Borrow.tsx"));
const BookDetails = lazy(() => import("./pages/BookDetails.tsx"));
const Summary = lazy(() => import("./pages/Summary.tsx"));
const EditBook = lazy(() => import("./pages/EditBook.tsx"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SuspenseWrapper>
        <App />
      </SuspenseWrapper>
    ),
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <Library />
          </SuspenseWrapper>
        ),
      },
      {
        path: "create-book",
        element: (
          <SuspenseWrapper>
            <CreateBook />
          </SuspenseWrapper>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <SuspenseWrapper>
            <EditBook />
          </SuspenseWrapper>
        ),
      },
      {
        path: "borrow/:id",
        element: (
          <SuspenseWrapper>
            <Borrow />
          </SuspenseWrapper>
        ),
      },
      {
        path: "books/:id",
        element: (
          <SuspenseWrapper>
            <BookDetails />
          </SuspenseWrapper>
        ),
      },
      {
        path: "borrow-summary",
        element: (
          <SuspenseWrapper>
            <Summary />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    ,
  </StrictMode>
);
