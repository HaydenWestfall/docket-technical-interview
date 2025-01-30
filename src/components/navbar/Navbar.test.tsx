import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
  test("renders post count correctly", () => {
    const postCount = 5;
    render(<Navbar postCount={postCount} />);

    const postCountElement = screen.getByText(`Post count is: ${postCount}`);
    expect(postCountElement).toBeInTheDocument();
  });
});
