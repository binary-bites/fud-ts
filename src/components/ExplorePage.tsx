import { ObjectId } from 'mongodb'
import { IPost } from '../../backend/models/postModel.ts'
import { IUser } from '../../backend/models/userModel.ts'
import { IComment } from '../../backend/models/commentModel.ts'

const MockUser: IUser = {
    username: "jeff",
    dateOfBirth: null,
    firstName: "jeff",
    lastName: "jefferson",
    email: "jeff@jeff.com",
    deleted: false,
    firebaseID: null
}

const MockPost: IPost = {
    title: "Mock post",
    content: "this is a mock post",
    user: MockUser,
    likes: [MockUser],
    dislikes: [],
    comments: [],
    ratings: [],
    images: ["https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8="]
}
/* const PostArray: IPost = [ MockPost ] */

function PostCard() {

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            {}
            <figure><img src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8=" alt="Food" /></figure>
            <div className="card-body">
                <h2 className="card-title">Yumbly foods</h2>
                <p>Boy, I bet you want to eat this!</p>
            </div>
        </div>
    )
}

export default function ExplorePage() {
    return (
        <div className="m-5">
            <PostCard />
        </div>
    )
}
