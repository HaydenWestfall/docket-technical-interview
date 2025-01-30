/**
 * API File blah blah
 */

import { Post } from "../models/Post";

/**
 * Fetch Posts from json placeholder and return promise
 * @returns JSON placeholder posts
 */
export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
}
