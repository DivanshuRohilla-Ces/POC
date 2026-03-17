import { render, screen } from "@testing-library/react";
import RenderUsers from "../../components/renderList";
import { makeUser } from "./fixtures/users.fixture";


const mockUser =  makeUser();

describe("RenderUsers Component", () => {
  test("renders simple key-value pairs", () => {
    render(<div>{RenderUsers(mockUser)}</div>);

    // Check top-level simple properties
    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'strong' && content.includes('firstName');
    })).toBeInTheDocument();
    expect(screen.getByText(mockUser.firstName)).toBeInTheDocument();

    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'strong' && content.trim().startsWith('age');
    })).toBeInTheDocument();
    expect(screen.getByText(String(mockUser.age))).toBeInTheDocument();
  });

  test("renders nested object keys", () => {
    render(<div>{RenderUsers(mockUser)}</div>);

    // Object key - use getAllByText to handle multiple matches, get first one
    const addressElements = screen.getAllByText((content, element) => {
      return element?.tagName.toLowerCase() === 'strong' && content.trim().startsWith('address');
    });
    expect(addressElements.length).toBeGreaterThan(0);

    // Nested keys inside address object
    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'strong' && content.trim().startsWith('city');
    })).toBeInTheDocument();
    expect(screen.getByText("Phoenix")).toBeInTheDocument();

    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'strong' && content.trim().startsWith('postalCode');
    })).toBeInTheDocument();
    expect(screen.getByText("29112")).toBeInTheDocument();
  });

  test("renders nested object inside div", () => {
    const { container } = render(<div>{RenderUsers(mockUser)}</div>);
    expect(container).toBeInTheDocument();
  });
});