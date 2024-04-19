import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'react-feather';
import { Endpoints } from '../utils/Endpoints';
import { useAuth } from "../contexts/AuthContext";
import { customGet, customFetch } from '../utils/customFetch';
import { set } from 'mongoose';

// Define the state enum
enum LikeState {
    Liked = 'liked',
    Disliked = 'disliked',
    Neither = 'neither'
}

interface LikeDislikeProps {
    postID: string;
}

const LikeDislike = ({ postID }: LikeDislikeProps) => {
    // Set initial state to Neither
    const [likeState, setLikeState] = useState<LikeState>(LikeState.Neither);
    const { currentUser } = useAuth();
    const [numLikes, setNumLikes] = useState<number>(0);
    const [numDislikes, setNumDislikes] = useState<number>(0);

    useEffect(() => {
        async function fetchLikes() {
            try {
                const queryParams = new URLSearchParams({ postID: postID });
                const token = await currentUser.getIdToken(true);
                const url = `${Endpoints.getPost}${queryParams.toString()}`;
                const response = await customGet(url, token);
                if (!response.ok) throw new Error("Failed to get comments");
                const postDetails = await response.json();
                console.log("LIKES", postDetails)
                if (postDetails.liked) {
                    setLikeState(LikeState.Liked);
                } else if (postDetails.disliked) {
                    setLikeState(LikeState.Disliked);
                } else {
                    setLikeState(LikeState.Neither);
                }
                setNumLikes(postDetails.likes.length)
                setNumDislikes(postDetails.dislikes.length)
            } catch (error) {
                console.error(error);
            }
        }
        fetchLikes();
    }, [currentUser, postID]);
    // Handler for liking
    const handleLike = async () => {
        try {
            const body = {
                postID,
            }
            const token = await currentUser.getIdToken(true); // Force token refresh
            const response = await customFetch(Endpoints.likePost, 'POST', body, token);
            if (!response.ok) {
                throw new Error("Failed to like post");
            }
            const resJson = await response.json();
            console.log("RESJOSN", resJson)
            if (resJson.liked) {
                setLikeState(LikeState.Liked);
            } else {
                setLikeState(LikeState.Neither);
            }
            setNumLikes(resJson.likes.length)
            setNumDislikes(resJson.dislikes.length)
        } catch (error) {
            console.error(error);
        }
    };

    // Handler for disliking
    const handleDislike = async () => {
        try {
            const body = {
                postID
            }
            const token = await currentUser.getIdToken(true); // Force token refresh
            const response = await customFetch(Endpoints.dislikePost, 'POST', body, token);
            if (!response.ok) {
                throw new Error("Failed to dislike post");
            }
            const resJson = await response.json();
            console.log("resjson", resJson)
            if (resJson.disliked) {
                setLikeState(LikeState.Disliked);
            } else {
                setLikeState(LikeState.Neither);
            }
            setNumLikes(resJson.likes.length)
            setNumDislikes(resJson.dislikes.length)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button 
                    onClick={handleLike}
                    style={{ border: likeState === LikeState.Liked ? `2px solid #747FFF` : '2px solid gray', padding: '10px', borderRadius: '5px' }}
                    aria-label="like"
                >
                    <ThumbsUp color={likeState === LikeState.Liked ? '#747FFF' : 'black'} size={24} />
                </button>
                <span>{numLikes}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button 
                    onClick={handleDislike}
                    style={{ border: likeState === LikeState.Disliked ? `2px solid #747FFF` : '2px solid gray', padding: '10px', borderRadius: '5px' }}
                    aria-label="dislike"
                >
                    <ThumbsDown color={likeState === LikeState.Disliked ? '#747FFF' : 'black'} size={24} />
                </button>
                <span>{numDislikes}</span>
            </div>
        </div>
    );
};

export default LikeDislike;
