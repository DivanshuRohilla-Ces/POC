import { render, screen, fireEvent } from "@testing-library/react";
import { Users } from "../../app/types";
import { useWindowWidth } from "../../app/hooks/useWindowWidth";
import Userlist from "../userList";

jest.mock("next/link", () => (props: any) => <a {...props} />);
jest.mock("../sidebar", () => () => <div data-testid="sidebar">Sidebar</div>);

// Mock the custom hook
jest.mock("@/app/hooks/useWindowWidth");

const mockUsers: Users[] = [
  {
    id: 1,
    firstName: "Emily",
    lastName: "Johnson",
    email: "",
    height: 170,
    eyeColor: "",
    bloodGroup: "",
    ein: "",
    image: "",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    email: "",
    height: 180,
    eyeColor: "",
    bloodGroup: "",
    ein: "",
    image: "",
  },
];

describe("UserList Component", () => {

  beforeEach(() => {
    (useWindowWidth as jest.Mock).mockReturnValue(false); // default: desktop
  });

  test("renders all users on desktop", () => {
    render(<Userlist users={mockUsers} />);

    expect(screen.getByText("Emily Johnson")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("clicking a user sets userData state and shows Sidebar (desktop)", () => {
    render(<Userlist users={mockUsers} />);

    const firstUser = screen.getByText("Emily Johnson");
    fireEvent.click(firstUser);

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  test("on mobile, users are wrapped in Link and Sidebar does NOT appear", () => {
    (useWindowWidth as jest.Mock).mockReturnValue(true); // mobile

    render(<Userlist users={mockUsers} />);

    const firstUser = screen.getByText("Emily Johnson");
    expect(firstUser.closest("a")).not.toBeNull(); // wrapped in Link

    fireEvent.click(firstUser);

    expect(screen.queryByTestId("sidebar")).toBeNull();
  });

});