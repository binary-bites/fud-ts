import React from "react";
import { IPost, IComment } from "../interfaces";
import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { customGet, customFetch } from '../utils/customFetch';
import { Endpoints } from '../utils/Endpoints';
import { StarRating } from "./StarRating"
import { InputBox } from "./FormElements";
import { Link } from "react-router-dom"

interface PostDetailsProps {
  post: IPost;
  onClose: () => void; // Function to call when closing the popover
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, onClose }) => {
  const { images, title, content, ratings, comments, _id } = post;
  const { currentUser } = useAuth();
  // Use useState to hold the posts fetched from the API
  const [currComments, setCurrComments] = useState<IComment[]>(comments);
  const [newComment, setNewComment] = useState<string>("");

  async function handleCreateComment() {
    try {
      const body = {
        content: newComment,
        postID: _id,
      }
      const token = await currentUser.getIdToken(true); // Force token refresh
      const response = await customFetch(Endpoints.createComment, 'POST', body, token);
      if (!response.ok) {
        throw new Error("Failed to create comment");
      }
      const createdComment = await response.json();
      setNewComment("");
      fetchComments()
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchComments() {
    try {
      const queryParams = new URLSearchParams({ postID: _id });
      const token = await currentUser.getIdToken(true);
      const url = `${Endpoints.getPost}${queryParams.toString()}`;
      const response = await customGet(url, token);
      if (!response.ok) throw new Error("Failed to get comments");
      const postDetails = await response.json();
      console.log("fetched post details", postDetails)
      await setCurrComments(postDetails.comments);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <dialog id={_id} className="modal modal-open">
        <div className="modal-box w-auto max-w-4xl my-4 mx-auto min-h-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-row justify-between h-96">
              <img
                src={images[0]}
                alt={title}
                className="rounded-lg"
              />
            <div className="flex flex-col"> {/* container */}
              <div className="grow flex flex-col min-h-0 px-6"> {/* section */}
                <div className="flex-none">
                  {/* title */}
                  <h1 className="text-xl font-semibold mb-2">{title}</h1>

                  {/* poster ratings - conditionally display*/}
                  {(ratings.length > 0) &&
                    <div>
                      <StarRating rating={ratings[0]}></StarRating>
                      <StarRating rating={ratings[1]}></StarRating>
                      <StarRating rating={ratings[2]}></StarRating>
                    </div>
                  }

                  {/* content */}
                  <div className="text-sm font-medium text-gray-500 mb-4 max-w-prose">
                    {content}
                  </div>
                </div>
                <h2 className="flex-none text-lg font-semibold">Comments</h2>
                {/* scrollable content */}
                <div className="grow space-y-2 overflow-y-auto my-2">
                  {currComments.map((comment) => (
                    <div key={comment._id} className="">
                      <p className="text-sm font-medium">{comment.content}</p>
                      <p className="text-xs text-gray-600">
                        By {comment.user.firstName} {comment.user.lastName} - {new Date(comment.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* comment box */}
                <form className="flex-none join w-full">
                  <InputBox
                    extraClasses="join-item focus:outline-none"
                    name="comment-box"
                    placeholder="Add a comment…"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary join-item"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCreateComment();
                    }}
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={onClose}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default PostDetails;
