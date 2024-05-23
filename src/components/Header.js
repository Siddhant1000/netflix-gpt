import { onAuthStateChanged, signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { NETFIX_LOGO } from '../utils/constant';

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
  return (
    <div className="absolute w-screen px-3 py-5 z-10 flex justify-between bg-gradient-to-b from-black">
        <img className="w-[200px]"
        src={NETFIX_LOGO} alt="logo"></img>
    {user && <div className='flex p-5'>
      <img className='h-10 w-10' src={user.photoURL} alt="user-profile"></img>
      <button onClick={handleSignOut} className='font-bold text-white '>(Sign Out)</button>
    </div>}
    </div>
    
  )
}

export default Header;