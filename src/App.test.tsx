import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";

jest.mock("./components/posts/Posts", () => ({
  __esModule: true,
  default: ({ onPostCountChange }: { onPostCountChange: (count: number) => void }) => (
    <div data-testid="posts" onClick={() => onPostCountChange(10)}>
      Mock Posts
    </div>
  ),
}));

describe("App Component", () => {
  test("renders Navbar and Posts components", () => {
    render(<App />);
    expect(screen.getByText(/Post count is: 0/i)).toBeInTheDocument();
    expect(screen.getByTestId("posts")).toBeInTheDocument();
  });

  test("updates post count when Posts component triggers onPostCountChange", async () => {
    render(<App />);

    // Check initial post count
    expect(screen.getByText(/Post count is: 0/i)).toBeInTheDocument();

    // Trigger post count change
    act(() => {
      fireEvent.click(screen.getByTestId("posts"));
    });

    // Expect updated post count in Navbar
    expect(screen.getByText(/Post count is: 10/i)).toBeInTheDocument();
  });
});
