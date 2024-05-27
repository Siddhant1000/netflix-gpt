import { onAuthStateChanged, signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { NETFIX_LOGO } from '../utils/constant';
import { toggleGptSearchView } from '../utils/gptSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store=>store.user);

  const handleSignOut=()=>{
    signOut(auth).then(() => {})
    .catch((error) => 
      {
        navigate("/error");
});

  }

 

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email, displayName,photoURL} = user;
        dispatch(addUser({
          uid:uid ,
          email:email ,
          displayName:displayName,
          photoURL:photoURL,
        }))
      navigate("/browse");

      }
      else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribe when component unmounts
    return () => unsubscribe();

    
  },[]);

  const handleGPTSearchClick = () =>{
    //Toggle GPT Search 
    dispatch(toggleGptSearchView());
    
  }

  return (
    <div className="absolute w-screen px-3 py-5 z-10 flex justify-between bg-gradient-to-b from-black">
        <img className="w-[200px] m-3"
        src={NETFIX_LOGO} alt="logo"></img>
    {user && 
    (
       <div className='flex p-5'>
        <button onClick={handleGPTSearchClick} className='py-2 px-4 m-5 bg-purple-800 text-white rounded-md'>GPT Search</button>
      <img className='h-10 w-10 m-5' src={user.photoURL} alt="user-profile"></img>
      <button onClick={handleSignOut} className='font-bold text-white '>(Sign Out)</button>
    </div>
    )}
    </div>
    
  )
}

export default Header;