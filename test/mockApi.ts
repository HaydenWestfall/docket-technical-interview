import { Post } from "../src/models/Post";

const mockPosts: Post[] = [
  { id: 123, title: "test post 1", body: "test body" },
  { id: 456, title: "test post 2", body: "test body" },
  { id: 789, title: "test post 3", body: "test body" },
];

export const fetchPosts = jest.fn(() => Promise.resolve(mockPosts));
