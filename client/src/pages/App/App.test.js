import { render as rtlRender, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../common/redux/store";
import App from ".";

const render = (children) => rtlRender(<Provider {...{ store }}>{children}</Provider>);

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
