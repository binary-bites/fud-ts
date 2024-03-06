import { IPost } from '../../backend/models/postModel.ts'
import { IUser } from '../../backend/models/userModel.ts'
import PostCardContainer from './PostCardContainer.tsx'
import { useAuth } from "../contexts/AuthContext.jsx";
import { customFetch, customGet } from '../customFetch.js'

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


export default function ExplorePage() {
    const { currentUser } = useAuth();

    const loadPosts = async () => {
        const url = "http://localhost:4000/api/userActivity/getPosts";
        try {
            const token = await currentUser.getIdToken(true); // Force token refresh
            const result = await customGet(url, token);
            if (!result.ok) {
                throw new Error("Failed to get posts")
            }
            const response = await result.json();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const posts = loadPosts();
    console.log(posts);


    return (
        <PostCardContainer posts={postArray} />
    )
}
