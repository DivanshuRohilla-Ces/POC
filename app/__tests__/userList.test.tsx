import { render, screen, fireEvent } from "@testing-library/react";
import { Users } from "../../services/types";
import { useWindowWidth } from "../../app/hooks/useWindowWidth";
// import Userlist from "../userList";
import { makeUser, makeUserList } from "../__tests__/fixtures/users.fixture";
import Userlist from "../../components/userList";

jest.mock("next/link", () => (props: any) => <a {...props} />);
jest.mock("../../components/sidebar", () => () => <div data-testid="sidebar">Sidebar</div>);

// Mock the custom hook
jest.mock("@/app/hooks/useWindowWidth");

  const mockUsers = makeUserList<Users>(5, makeUser);

describe("UserList Component", () => {

  beforeEach(() => {
    (useWindowWidth as jest.Mock).mockReturnValue(false); // default: desktop
  });

  test("renders all users on desktop", () => {
    render(<Userlist users={mockUsers} />);
  
    expect(mockUsers).toHaveLength(5);

    expect(screen.getByText(mockUsers[0].firstName + " " + mockUsers[0].lastName)).toBeInTheDocument();
    expect(screen.getByText(mockUsers[1].firstName + " " + mockUsers[1].lastName)).toBeInTheDocument();
  });

  test("clicking a user sets userData state and shows Sidebar (desktop)", () => {
    render(<Userlist users={mockUsers} />);

    const firstUser = screen.getByText(mockUsers[0].firstName + " " + mockUsers[0].lastName);
    fireEvent.click(firstUser);

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  test("on mobile, users are wrapped in Link and Sidebar does NOT appear", () => {
    (useWindowWidth as jest.Mock).mockReturnValue(true); // mobile

    render(<Userlist users={mockUsers} />);

    const firstUser = screen.getByText(mockUsers[0].firstName + " " + mockUsers[0].lastName);
    expect(firstUser.closest("a")).not.toBeNull(); // wrapped in Link

    fireEvent.click(firstUser);

    expect(screen.queryByTestId("sidebar")).toBeNull();
  });

});