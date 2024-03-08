import { useState, useEffect } from 'react';
import PostCardContainer from './PostCardContainer.tsx';
import { useAuth } from "../contexts/AuthContext.jsx";
import { customGet } from '../customFetch.js'
import { IPost } from '../interfaces'

export default function ExplorePage() {
    const { currentUser } = useAuth();
    // Use useState to hold the posts fetched from the API
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        const loadPosts = async () => {
            const url = "http://localhost:4000/api/userActivity/getPosts";
            try {
                const token = await currentUser.getIdToken(true); // Force token refresh
                const result = await customGet(url, token);
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

        loadPosts();
    }, [currentUser]); // Re-run the effect if currentUser changes

    return (
        <PostCardContainer posts={posts} />
    )
}

