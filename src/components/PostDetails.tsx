import React from "react";
import { IPost } from "../interfaces";

interface PostDetailsProps {
  post: IPost;
  onClose: () => void; // Function to call when closing the popover
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, onClose }) => {
  const { images, title, content, ratings, _id } = post;
  return (
    <div>
      <dialog id={_id} className="modal modal-open">
        <div className="modal-box w-full max-w-4xl"
          onClick={(e) => e.stopPropagation() /*prevent clicks in box from closing*/}
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

                {/* poster ratings */}



                
                {/* content */}
                <div className="text-sm font-medium text-gray-500 mb-4">
                  {content}
                </div>
                {/* Example using Unicode characters for like/dislike, replace with icons as needed */}
                <div className="flex items-center space-x-2 mb-4">
                  <label>Rate Post: </label>
                  <div className="rating">
                    <input
                      type="radio"
                      name="postRating"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="postRating"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="postRating"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="postRating"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="postRating"
                      className="mask mask-star-2 bg-orange-400"
                    />
                  </div>
                </div>
              </div>
              <form className="flex items- space-x-3">
                <input
                  type="text"
                  placeholder="Add a comment…"
                  /* className="flex-1 rounded-md p-2 border-gray-300" */
                  className="input input-bordered w-full flex-1"
                  style={{
                    borderColor: "rgba(209, 213, 219)",
                    color: "black",
                    backgroundColor: "white",
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    //prevent button from reloading page
                    e.preventDefault()
                    //will add comment posting logic later
                  }}
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* invisible button - click anywhere outside box to close */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={onClose}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default PostDetails;
