import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BooksPageTypes } from "../types/types-routes";

import BooksPage from "../pages/BooksPage";
import BooksSinglePage from "../pages/BooksSinglePage";

export const pages: BooksPageTypes[] = [
  { path: "/", exact: true, component: BooksPage },
  { path: "/#", exact: true, component: BooksPage },

  { path: "/book-details/:id", component: BooksSinglePage },
  { path: "/book-new", component: BooksSinglePage },
];

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {pages.map(({ component, path }) => {
          const Component = component;
          return <Route key={path} element={<Component />} path={path} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
