import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  // useRef is used to reference the image to take the image file input.
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector(state => state.user)
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  // app is imported from firebase.js
  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    // creating a storage reference to get where the file was uploaded.
    const storageRef = ref(storage, fileName);
    // uploadBytesResumables is a method of firebase to check the upload percentage.
    const uploadTask = uploadBytesResumable(storageRef, file);

    // getting the percentage of the upload
    uploadTask.on("stage_changed",
    // snapshot is the information of each stage change.
    (snapshot) => {
      const progress = (snapshot.bytesTransferred /
      snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
  },
  (error) => {
    setFileUploadError(true);
  },
  ()=> {
    getDownloadURL(uploadTask.snapshot.ref).then(
      (downloadURL) =>{
        setFormData({
         ...formData,
          avatar: downloadURL,
        });
      }
    )
  });
  }


  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  // fetching api then passing the form data as body to the backend
  // and updating the data in backend using api route.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success == false){
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    } catch(error){
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async () =>{
    try {
      dispatch(deleteUserStart(true));
      const res = await  fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('api/auth/signout');
      const data = await res.json();
      if(data.success == false){
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>{setFile(e.target.files[0])}} hidden type="file" ref={fileRef} accept='image/*'/>

        {/* onclick will run the function fileRef.current.click() and reference image with file input. */}
        <img 
        onClick={()=>fileRef.current.click()} 
        src={formData.avatar || currentUser.avatar} 
        alt="profile" 
        className='rounded-full h-24 w-24 object cover 
        cursor-pointer self-center mt-2'/>

        <p className='self-center text-sm'>
          {fileUploadError ? 
          (<span className='text-red-700'>Error Image uplaod (File should be an image and must Less Than 5mb)</span>) :
            filePerc > 0 && filePerc < 100 ?
            (<span className='text-green-500'>
              {`Uploading ${filePerc}%`}
            </span>) :
            filePerc === 100 && !fileUploadError ?
            (<span className='text-green-700'>Image 
            Successfully Uploaded !</span>) : (
            ""
           )}
        </p>

        <input type="text" placeholder='username' 
        defaultValue={currentUser.username}
        id='username' className='border p-3 rounded-lg' 
        onChange={handleChange}
        />

        <input type="email" placeholder='email' 
        defaultValue={currentUser.email}
        id='email' className='border p-3 rounded-lg'
        onChange={handleChange}
        />

        <input type="password" placeholder='password' 
        id='password' className='border p-3 rounded-lg' 
        onChange={handleChange}
        />

        <button disabled={loading} className='bg-slate-700 text-white
        rounded-lg p-3 uppercase hover:bg-blue-900 disabled:opacity-70'>
          {loading? 'Loading...': 'Update'}
        </button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:bg-green-500' to={"/create-listing"}>
          Create Listing
        </Link>
      </form>

      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>

      <p className='text-red-500 mt-5'>{error? error : ""}</p>
      <p className='text-green-700 mt-5'>{updateSuccess? 'User is updated successfully' : ''}</p>
    </div>
  )
}
