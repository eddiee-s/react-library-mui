import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};

  "/book-details/:id"?: {};
  "/book-new"?: {};

  "*"?: {};

  "/page404"?: {};
}

export type PathName = keyof LocationStates;

export interface BooksPageTypes {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
