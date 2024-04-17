import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { customGet, customFetch } from '../utils/customFetch';
import { IPost, IProfile } from '../interfaces';
import { Endpoints } from '../utils/Endpoints';
import PostCardContainer from './PostCardContainer';
import PostDetails from './PostDetails';
import { FormLabel } from 'react-bootstrap';

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e) => void; // Function to call when changing data
}
export const InputBox: React.FC<InputProps> = ({ label, name, placeholder, value, onChange }) => {
  return (
    <label className="w-full mb-2">
      <div className="label">
        <span className="label-text">{label}:</span>
      </div>
      <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} className="input input-bordered w-full" />
    </label>
  );
}

export const TextArea: React.FC<InputProps> = ({ label, name, placeholder, value, onChange }) => {

  return (
    <label className='w-full mb-2'>
      <div className="label">
        <span className="label-text">{label}: </span>
      </div>
      <textarea className="textarea textarea-bordered w-full" name={name}
        value={value} placeholder={placeholder} onChange={onChange} />
    </label>
  )
}

//get only those 3 parameters from inputProps
interface FileInputProps extends Pick<InputProps, 'label' | 'name' | 'onChange'> {}
export const FileInput: React.FC<FileInputProps> = ({ label, name, onChange }) => {
  return (
    <label className="w-full">
      <div className="label">
        <span className="label-text">{label}:</span>
      </div>
      <input type="file" name={name} onChange={onChange} className="file-input file-input-bordered w-full" />
    </label>
  )
}

/*
*   <input type = "file" name = "profilePicture" onChange = { handleFileChange } className = "input input-bordered" /> */
