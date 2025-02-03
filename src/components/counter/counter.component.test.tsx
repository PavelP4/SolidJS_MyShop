import { test, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import Counter from "./counter.component";

const user = userEvent.setup();

test("counter component", async () => {
  
  const { getByRole } = render(() => <Counter />);
  
  const button = getByRole('button');
  expect(button).toHaveTextContent("0");
  await user.click(button);
  expect(button).toHaveTextContent("1");
  
})