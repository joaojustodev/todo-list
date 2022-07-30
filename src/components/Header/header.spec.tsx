import { render } from "@testing-library/react";
import Header from "./index";

describe("<Header/>", () => {
  it("Should render TodoList", () => {
    const { getByText } = render(<Header />);

    expect(getByText("TodoList")).toBeInTheDocument();
  });
});
