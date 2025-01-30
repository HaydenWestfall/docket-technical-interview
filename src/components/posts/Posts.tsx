import React, { useEffect, useState } from "react";
import "./Posts.scss";
import { Post } from "../../models/Post";
import { fetchPosts } from "../../api/api";

// Define the props type for Posts component
interface PostsProps {
  onPostCountChange: (count: number) => void;
}

const Posts: React.FC<PostsProps> = ({ onPostCountChange }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetchPosts();
        setPosts(response);
        onPostCountChange(response.length);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [onPostCountChange]);

  if (loading) return <p>Loading...</p>;

  return (
    <div data-testid="posts" className="posts-wrapper">
      {posts.slice(0, 5).map((post) => (
        <div key={post.id} className="post">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
