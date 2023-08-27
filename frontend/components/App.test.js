import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppFunctional from "./AppFunctional";

describe("AppFunctional", () => {
  beforeAll(() => {
    render(<AppFunctional />);
  });

  test("info div has the right headings", () => {
    const coorInfo = screen.getByTestId(/coordinates-info/i);
    expect(coorInfo).toBeInTheDocument();
    expect(coorInfo).toHaveTextContent(/Koordinatlar /i);

    const stepsInfo = screen.getByTestId(/steps-info/i);
    expect(stepsInfo).toBeInTheDocument();
    expect(stepsInfo).toHaveTextContent(/ kere ilerlediniz/i);
  });
});
