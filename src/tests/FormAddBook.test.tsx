import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FormAddBook from "../components/Forms/FormAddBook";

test('check if "upload" button is disabled', async () => {
  render(
    <BrowserRouter>
      <FormAddBook />,
    </BrowserRouter>
  );
  const buttonElement = screen.getByRole("button", { name: /upload/i });
  expect(buttonElement).toBeDisabled();
});

test('Check if "save book" button is enabled', async () => {
  render(
    <BrowserRouter>
      <FormAddBook />,
    </BrowserRouter>
  );
  const buttonElement = screen.getByRole("button", { name: /save book/i });
  expect(buttonElement).toBeEnabled();
});
