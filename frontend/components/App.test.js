import { render } from "@testing-library/react";
import AppFunctional from "./AppFunctional";

describe("AppFunctional", () => {
  beforeAll(() => {
    render(<AppFunctional />);
  });
});
