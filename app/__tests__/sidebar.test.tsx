import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { makeUser } from "./fixtures/users.fixture";

import Sidebar from "../../components/sidebar";

describe("Sidebar Component", () => {
  const mockUser = makeUser();
  test("renders user details", () => {
    render(<Sidebar user={mockUser} />);

    expect(screen.getByText("User Details")).toBeInTheDocument();
    expect(screen.getByText(mockUser.firstName)).toBeInTheDocument();
    expect(screen.getByText(mockUser.lastName)).toBeInTheDocument();
  });

  test("renders user image", () => {
    render(<Sidebar user={mockUser} />);

    const img = screen.getByAltText(mockUser.image);
    expect(img).toBeInTheDocument();
  });
});

