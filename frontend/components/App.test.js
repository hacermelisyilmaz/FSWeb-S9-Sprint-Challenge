import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppFunctional from "./AppFunctional";

describe("AppFunctional", () => {
  beforeAll(() => {
    render(<AppFunctional />);
  });

  test("info div has the coordination heading", () => {
    const coorInfo = screen.getByTestId(/coordinates-info/i);
    expect(coorInfo).toBeInTheDocument();
    expect(coorInfo).toHaveTextContent(/Koordinatlar /i);
  });

  test("info div has the steps heading", () => {
    const stepsInfo = screen.getByTestId(/steps-info/i);
    expect(stepsInfo).toBeInTheDocument();
    expect(stepsInfo).toHaveTextContent(/ kere ilerlediniz/i);
  });
});
