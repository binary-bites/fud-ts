import { useState, useEffect } from 'react';
import PostCardContainer from './PostCardContainer.tsx';
import { useAuth } from "../contexts/AuthContext";
import { customGet } from '../utils/customFetch.js'
import { IPost } from '../interfaces'
import PostDetails from './PostDetails.tsx';
import { Endpoints } from '../utils/Endpoints.tsx';

export default function ExplorePage() {
  const { currentUser } = useAuth();
  // Use useState to hold the posts fetched from the API
  const [posts, setPosts] = useState<IPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  const handlePostClick = (post: IPost) => {
    console.log("clicked on a post")
    setSelectedPost(post);
  };

  const loadPosts = async () => {
    try {
      let result
      if (currentUser) {
        const token = await currentUser.getIdToken(true); // Force token refresh
        result = await customGet(Endpoints.getPosts, token);
      } else {
        result = await customGet(Endpoints.getPostsLoggedOut)
      }
      if (!result.ok) {
        throw new Error("Failed to get posts")
      }
      const response = await result.json();
      // Update the state with the fetched posts
      setPosts(response); // Assuming the response is an array of posts

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    loadPosts();
  }, [currentUser]); // Re-run the effect if currentUser changes

  async function handleClose() {
    setSelectedPost(null);
    loadPosts();
  }

  return (
    <>
      <PostCardContainer posts={posts} onClick={handlePostClick} />
      {selectedPost && <PostDetails post={selectedPost} onClose={handleClose} />}
    </>
  );
}

