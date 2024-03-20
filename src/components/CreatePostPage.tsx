import { ChangeEvent, useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import  customFetch from '../utils/customFetch.js'
import { IImage } from '../interfaces';
import { Endpoints } from '../utils/Endpoints';

export default function CreatePostPage() {
    const { currentUser } = useAuth();
    const [images, setImages] = useState<File[]>([]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('')

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImages(files); // Store the file objects directly
        }
    };
    
    const handleCreatePost = async () => {
        const method = "POST"
        let formData = new FormData();
        formData.append('title', title);
        formData.append('content', description);
        
        images.forEach((file, index) => {
            formData.append(`image${index}`, file); // Append each file object
        });
        
        try {
            const token = await currentUser.getIdToken(true); // Force token refresh
            const result = await customFetch(Endpoints.createPost, method, formData, token);
            if (!result.ok) {
              throw new Error("Failed to create post")
            }
            const response = await result.json();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-start gap-4 mt-4">
            <div className="flex flex-row gap-20" style={{ width: '90%' }}>
                <div className="w-1/2" style={{ marginLeft: '5%' }}>
                    <input type="file" multiple onChange={handleImageChange} className="mb-4" />
                    <div className="carousel w-full">
                        {images.map((image, index) => (
                            <div key={index} id={`slide${index+1}`} className="carousel-item relative w-full">
                                <div className="w-full h-full bg-black flex justify-center items-center">
                                    <img src={(URL.createObjectURL(image))} alt={`Slide ${index+1}`}
                                        className="max-w-full max-h-full object-contain"
                                        style={{ backgroundColor: 'black' }}
                                    />
                                </div>
                                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href={`#slide${index === 0 ? images.length : index}`} className="btn btn-circle">❮</a> 
                                    <a href={`#slide${index === images.length - 1 ? 1 : index + 2}`} className="btn btn-circle">❯</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-4" style={{ marginRight: '5%' }}>
                    <input
                        type="text"
                        placeholder="Enter title here..."
                        className="input input-bordered w-full rounded-lg shadow"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Write your description here..."
                        className="textarea textarea-bordered h-64 w-full rounded-lg shadow"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="rating">
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                    </div>
                    <button
                        onClick={handleCreatePost}
                        className="btn btn-primary w-full rounded-lg shadow"
                    >
                        Create Post
                    </button>
                </div>
            </div>
        </div>
    );
}