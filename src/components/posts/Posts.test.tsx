import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Posts from "./Posts";
import { fetchPosts } from "../../api/api";
import { Post } from "../../models/Post";

// Mock the fetchPosts API call
jest.mock("../../api/api", () => ({
  fetchPosts: jest.fn(),
}));

describe("Posts Component", () => {
  const mockOnPostCountChange = jest.fn();
  const mockPosts: Post[] = [
    { id: 1, title: "Post 1", body: "Body 1" },
    { id: 2, title: "Post 2", body: "Body 2" },
    { id: 3, title: "Post 3", body: "Body 3" },
    { id: 4, title: "Post 4", body: "Body 4" },
    { id: 5, title: "Post 5", body: "Body 5" },
    { id: 6, title: "Post 6", body: "Body 6" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    (fetchPosts as jest.Mock).mockResolvedValueOnce([]);
    render(<Posts onPostCountChange={mockOnPostCountChange} />);
    await waitFor(() => {
      expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });
  });

  it("renders posts after fetching", async () => {
    (fetchPosts as jest.Mock).mockResolvedValueOnce(mockPosts);
    render(<Posts onPostCountChange={mockOnPostCountChange} />);

    await waitFor(() => expect(screen.getByText("Post 1")).toBeInTheDocument());
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(screen.getByText("Post 3")).toBeInTheDocument();
    expect(screen.getByText("Post 4")).toBeInTheDocument();
    expect(screen.getByText("Post 5")).toBeInTheDocument();
    expect(screen.queryByText("Post 6")).not.toBeInTheDocument(); // Ensures only 5 posts are shown
  });

  it("calls onPostCountChange with the correct count", async () => {
    (fetchPosts as jest.Mock).mockResolvedValueOnce(mockPosts);
    render(<Posts onPostCountChange={mockOnPostCountChange} />);

    await waitFor(() => expect(mockOnPostCountChange).toHaveBeenCalledWith(mockPosts.length));
  });

  it("handles API errors gracefully", async () => {
    (fetchPosts as jest.Mock).mockRejectedValueOnce(new Error("API error"));
    render(<Posts onPostCountChange={mockOnPostCountChange} />);

    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());
    expect(mockOnPostCountChange).not.toHaveBeenCalled();
  });
});
