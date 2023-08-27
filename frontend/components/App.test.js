import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppFunctional from "./AppFunctional.js";

describe("AppFunctional", () => {
  beforeEach(() => {
    render(<AppFunctional />);
  });

  test("info div has the coordination heading", () => {
    const coorInfo = screen.getByTestId("coordinates-info");
    expect(coorInfo).toBeInTheDocument();
    expect(coorInfo).toHaveTextContent(/Koordinatlar /i);
  });

  test("info div has the steps heading", () => {
    const stepsInfo = screen.getByTestId("steps-info");
    expect(stepsInfo).toBeInTheDocument();
    expect(stepsInfo).toHaveTextContent(/ kere ilerlediniz/i);
  });

  test("buttons have the right label", () => {
    const leftButton = screen.getByTestId("button-left");
    expect(leftButton).toHaveTextContent(/sol/i);

    const upButton = screen.getByTestId("button-up");
    expect(upButton).toHaveTextContent(/yukarI/i);

    const rightButton = screen.getByTestId("button-right");
    expect(rightButton).toHaveTextContent(/sağ/i);

    const downButton = screen.getByTestId("button-down");
    expect(downButton).toHaveTextContent(/aşağI/i);

    const resetButton = screen.getByTestId("button-reset");
    expect(resetButton).toHaveTextContent(/reset/i);
  });
});
