import React from 'react';
import { IPost } from '../interfaces';

interface PostDetailsProps {
    post: IPost;
    onClose: () => void; // Function to call when closing the popover
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, onClose }) => {
    const { images, title, content } = post;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
            <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
                <div className="flex">
                    <div className="flex-none w-48 relative">
                        <img src={images[0]} alt={title} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="flex-auto p-6">
                        <div className="mb-4">
                            <h1 className="text-xl font-semibold mb-2">{title}</h1>
                            <div className="text-sm font-medium text-gray-500 mb-4">{content}</div>
                            {/* Example using Unicode characters for like/dislike, replace with icons as needed */}
                            <div className="flex items-center space-x-2 mb-4">
                                <button aria-label="Like" className="text-blue-500">
                                    👍
                                </button>
                                <button aria-label="Dislike" className="text-red-500">
                                    👎
                                </button>
                            </div>
                        </div>
                        <form className="flex space-x-3">
                            <input type="text" placeholder="Add a comment…" className="flex-1 rounded-md p-2 border-gray-300" style={{ borderColor: 'rgba(209, 213, 219)', color: 'black', backgroundColor: 'white' }} />
                            <button type="submit" className="flex-none bg-blue-500 text-white text-sm leading-6 font-semibold py-2 px-4 rounded-md">
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
