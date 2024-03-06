import { IPost } from '../../backend/models/postModel.ts'
import { IUser } from '../../backend/models/userModel.ts'

const mockUser: IUser = {
    username: "jeff",
    dateOfBirth: null,
    firstName: "jeff",
    lastName: "jefferson",
    email: "jeff@jeff.com",
    deleted: false,
    firebaseID: null
}

const mockPost: IPost = {
    title: "Mock post",
    content: "this is a mock post",
    date: new Date(),
    deleted: false,
    user: mockUser,
    likes: [mockUser],
    dislikes: [],
    comments: [],
    ratings: [],
    images: ["https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8="]
}
const mockPost2: IPost = {
    title: "Mock post 2",
    content: "this is a mock post",
    date: new Date(),
    deleted: false,
    user: mockUser,
    likes: [mockUser],
    dislikes: [],
    comments: [],
    ratings: [],
    images: ["https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8="]
}
const postArray: IPost[] = [mockPost, mockPost2]

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

interface PostGridProps {
    posts: IPost[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
    return (
        <div className="m-4 flex flex-wrap justify-center gap-4">
            {posts.map((post, index) => (
                <PostCard post={post} key={index}/>
            ))}
        </div>
    )
}

export default function ExplorePage() {
    return (
        <PostGrid posts={postArray}/>
    )
}
