import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { customGet, customFetch } from '../utils/customFetch';
import { IPost, IProfile } from '../interfaces';
import { Endpoints } from '../utils/Endpoints';
import PostCardContainer from './PostCardContainer';
import PostDetails from './PostDetails';
import { get, set } from 'mongoose';

export default function ProfilePage() {
    const { currentUser } = useAuth();
    const [userProfile, setUserProfile] = useState<IProfile>({
        bio: '',
        profilePicture: '',
        followers: [],
        following: [],
        savedPosts: [],
        firstName: '',
        lastName: '',
        profileFile: null,
    });
    const [posts, setPosts] = useState<IPost[]>([]);
    const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profilePicturePreview, setProfilePicturePreview] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserProfile(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setProfilePicturePreview('');
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserProfile(prevState => ({
                ...prevState,
                profileFile: file,
            }));
            // Create a preview URL for the uploaded file
            setProfilePicturePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();

        // Stringify the ratingsData array
        // Append the stringified ratings to formData
        formData.append('firstName', userProfile.firstName);
        formData.append('lastName', userProfile.lastName);
        formData.append('bio', userProfile.bio);
        if (userProfile.profileFile) {
            formData.append('image', userProfile.profileFile!);

        }
        if (currentUser) {
            const token = await currentUser.getIdToken(true); // Force token refresh
            const result = await customFetch(Endpoints.editProfile, "POST", formData, token);
            if (!result.ok) {
                throw new Error("Failed to get user profile");
            }
            const response = await result.json();
            setUserProfile(response); // Set the userProfile with the fetched data
        }
        console.log('Submitting:', userProfile);
        fetchUserProfile();
        closeModal(); // Close modal after submit
    };

    const fetchUserProfile = async () => {
        try {
            if (currentUser) {
                const token = await currentUser.getIdToken(true); // Force token refresh
                const result = await customGet(Endpoints.getUserProfile, token);
                if (!result.ok) {
                    throw new Error("Failed to get user profile");
                }
                const response = await result.json();
                setUserProfile(response); // Set the userProfile with the fetched data
            }
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
        }
    };

    const fetchUserPosts = async () => {
        try {
            if (currentUser) {
                const token = await currentUser.getIdToken(true); // Force token refresh
                const result = await customGet(Endpoints.getProfilePosts, token);
                if (!result.ok) {
                    throw new Error("Failed to get user posts");
                }
                const response = await result.json();
                setPosts(response); // Assuming the response is an array of posts
            }
        } catch (error) {
            console.error("Failed to fetch user posts:", error);
        }
    };

    useEffect(() => {
        

        fetchUserProfile();
        fetchUserPosts();
    }, [currentUser]);

    const handlePostClick = (post: IPost) => {
        console.log("clicked on a post")
        setSelectedPost(post);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center"  onClick={() => setIsModalOpen(true)}>
                    {/* Profile Picture */}
                    <div className="w-24 h-24 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden rounded-full border-2 border-gray-300 shadow-lg">
                        <img src={userProfile.profilePicture || "https://via.placeholder.com/150"} alt="Profile" className="w-full h-full object-cover"/>
                    </div>
    
                    {/* Name and Bio */}
                    <div className="text-center mt-4">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{userProfile.firstName} {userProfile.lastName}</h1>
                        <p className="text-md md:text-lg lg:text-xl mt-2 text-gray-600">{userProfile.bio}</p>
                    </div>
                </div>
    
                {/* Posts Container - Assuming PostCardContainer is a component to display posts */}
                <div className="mt-8">
                    <PostCardContainer posts={posts} onClick={handlePostClick}/>
                </div>

                {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg max-w-sm mx-auto">
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Edit Profile</h2>
                            <input type="text" name="firstName" value={userProfile.firstName} onChange={handleInputChange} placeholder="First Name" className="border p-2"/>
                            <input type="text" name="lastName" value={userProfile.lastName} onChange={handleInputChange} placeholder="Last Name" className="border p-2"/>
                            <input type="text" name="bio" value={userProfile.bio} onChange={handleInputChange} placeholder="Bio" className="border p-2"/>
                            {/* File Upload for Profile Picture */}
                            <input type="file" name="profilePicture" onChange={handleFileChange} className="border p-2"/>
                            {/* Optionally, display the selected image preview */}
                            {profilePicturePreview && <img src={profilePicturePreview} alt="Preview" className="mx-auto w-24 h-24 rounded-full object-cover"/>}
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Submit</button>
                        </form>
                        <button onClick={() => closeModal()} className="mt-4 text-sm text-blue-500">Cancel</button>
                    </div>
                </div>
            )}
    
                {/* Post Details Modal/Container - Conditional rendering based on selectedPost */}
                {selectedPost && <PostDetails post={selectedPost} onClose={() => setSelectedPost(null)} />}
            </div>
        </div>
    );
    
}