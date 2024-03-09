import { IPost } from '../interfaces'

interface PostCardProps {
    post: IPost;
    onClick: (post: IPost) => void;
}
// define postCard as a functional component that takes in the PostCardProps
//  then, destructures post out of the properties and makes it available to the component
const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
    const { images, title, content } = post; //destructure attributes from post and include in card
    return (
        <div className="card card-compact w-80 bg-base-300 shadow-xl" onClick={() => onClick(post)}>
            <figure><img src={images[0]} alt={title} /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{content}</p>
            </div>
        </div>
    )
}

interface PostCardContainerProps {
    posts: IPost[];
    onClick: (post: IPost) => void;
}

const PostCardContainer: React.FC<PostCardContainerProps> = ({ onClick, posts }) => {
    return (
        <div className="m-4 flex flex-wrap justify-center gap-4">
            {posts.map((post, index) => (
                <PostCard post={post} key={index} onClick={onClick} />
            ))}
        </div>
    )
}

export default PostCardContainer
