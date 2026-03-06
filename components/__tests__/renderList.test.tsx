import { render, screen } from "@testing-library/react";
import RenderUsers from "../renderList";

const mockUser = {
  firstName: "Emily",
  age: 29,
  address: {
    city: "Phoenix",
    postalCode: "29112",
  },
};

describe("RenderUsers Component", () => {
  test("renders simple key-value pairs", () => {
    render(<div>{RenderUsers(mockUser)}</div>);

    // Check top-level simple properties
    expect(screen.getByText("firstName:")).toBeInTheDocument();
    expect(screen.getByText("Emily")).toBeInTheDocument();

    expect(screen.getByText("age:")).toBeInTheDocument();
    expect(screen.getByText("29")).toBeInTheDocument();
  });

  test("renders nested object keys", () => {
    render(<div>{RenderUsers(mockUser)}</div>);

    // Object key
    expect(screen.getByText("address:")).toBeInTheDocument();

    // Nested keys inside address object
    expect(screen.getByText("city:")).toBeInTheDocument();
    expect(screen.getByText("Phoenix")).toBeInTheDocument();

    expect(screen.getByText("postalCode:")).toBeInTheDocument();
    expect(screen.getByText("29112")).toBeInTheDocument();
  });

  test("renders nested object inside div", () => {
    const { container } = render(<div>{RenderUsers(mockUser)}</div>);
  });
});