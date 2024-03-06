import { IPost } from '../../backend/models/postModel.ts'

interface PostCardProps {
    post: IPost;
}
// define postCard as a functional component that takes in the PostCardProps
//  then, destructures post out of the properties and makes it available to the component
const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const { images, title, content } = post; //destructure attributes from post and include in card
    return (
        <div className="card card-compact w-80 bg-base-300 shadow-xl">
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
}

const PostCardContainer: React.FC<PostCardContainerProps> = ({ posts }) => {
    return (
        <div className="m-4 flex flex-wrap justify-center gap-4">
            {posts.map((post, index) => (
                <PostCard post={post} key={index}/>
            ))}
        </div>
    )
}

export default PostCardContainer
