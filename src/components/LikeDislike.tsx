import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'react-feather';
import { Endpoints } from '../utils/Endpoints';
import { useAuth } from "../contexts/AuthContext";
import { customGet, customFetch } from '../utils/customFetch';

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
    <div className="flex flex-row gap-1">
      {/* like icons */}
      <div className="flex flex-col items-center mb-2">
        <button
          onClick={handleLike}
          className={`btn btn-square btn-outline hover:btn-primary
${likeState === LikeState.Liked ? 'btn-active btn-primary' : ''}
          `}
          aria-label="like"
        >
          <ThumbsUp/>
        </button>
        <span>{numLikes}</span>
      </div>
      <div className="flex flex-col items-center mb-2">
        <button
          onClick={handleDislike}
          className={`btn btn-square hover:btn-primary btn-outline
${likeState === LikeState.Disliked ? 'btn-active btn-primary' : ''}
          `}
            aria-label="dislike"
        >
          <ThumbsDown/>
        </button>
        <span>{numDislikes}</span>
      </div>
    </div>
  );
};

export default LikeDislike;
