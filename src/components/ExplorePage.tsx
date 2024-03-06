import { IPost } from '../../backend/models/postModel.ts'
import { IUser } from '../../backend/models/userModel.ts'
import PostCardContainer from './PostCardContainer.tsx'
import customFetch from '../customFetch.js'

/* const posts = await customFetch("http://localhost:4000/api/userActivity/getPosts", "GET", )
* console.log(posts) */

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
    return (
        <PostCardContainer posts={postArray}/>
    )
}
