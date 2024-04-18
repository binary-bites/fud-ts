import React from "react";
import { IPost, IComment } from "../interfaces";
import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { customGet, customFetch } from '../utils/customFetch';
import { Endpoints } from '../utils/Endpoints';
import { StarRating } from "./StarRating"
import { InputBox } from "./FormElements";
import { Link } from "react-router-dom"
import LikeDislike from "./LikeDislike";
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
        <div className="modal-box w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex">
            <div className="flex-none w-60 relative">
              <img
                src={images[0]}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-auto p-6">
              <div className="mb-4">
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
                <div className="text-sm font-medium text-gray-500 mb-4">
                  {content}
                </div>
                {/* like dislike */}
                <LikeDislike postID={_id}></LikeDislike>
              </div>

              {/* Comments Section - only render if logged in*/}
              {currentUser &&
                <div>
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold">Comments</h2>
                    <div className="space-y-2">
                      {currComments.map((comment) => (
                        <div key={comment._id} className="">
                          <p className="text-sm font-medium">{comment.content}</p>
                          <p className="text-xs text-gray-600">
                            By {comment.user.firstName} {comment.user.lastName} - {new Date(comment.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* comment box */}
                  <form className="join w-full">
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
              }
              {/* logged out indicator */}
              {!currentUser &&
                <div role="alert" className="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>You must log in to see comments.</span>
                  <div>
                    <Link to="/login"><button className="btn btn-sm btn-primary">Log in</button></Link>
                  </div>
                </div>
              }

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
