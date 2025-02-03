import { test, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import HomeDetails from "./home-details.component";
import {Route} from "@solidjs/router";

const user = userEvent.setup();

test("HomeDetails component", async () => {
  
  const App = () => (
  <>
    <Route path='/home/details/:id' component={HomeDetails} ></Route>
  </>);
  const { findByTestId } = render(() => <App />, { location: 'home/details/3' });
  
  const input = await findByTestId('userInput');

  expect(input).toHaveValue("");  
  await user.type(input, "hello");
  expect(input).toHaveValue("hello");
  
})