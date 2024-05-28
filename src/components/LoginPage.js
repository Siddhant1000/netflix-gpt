import Header from './Header';
import React, { useRef, useState } from 'react';
import {checkValidData} from "../utils/validate";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BACKGROUND_IMG, PHOTO_AVATAR } from '../utils/constant';


const LoginPage = () => {
  const[isSignInForm,setisSignInForm] = useState(true);
  const[errorMessage,setErrorMessage] = useState(null);

  const dispatch = useDispatch();


  const name = useRef(null);

  const email = useRef(null);

  const password = useRef(null);

  const handleButtonClick = () =>{
 
    const message =  checkValidData(email.current.value,password.current.value);
    setErrorMessage(message);

    if(message) return;

    //Sign In and Sign Up Logic

    if(!isSignInForm){
      //SignUpLogic
      createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value,
          photoURL: PHOTO_AVATAR
        }).then(() => {
          const {uid,email, displayName,photoURL} = auth.currentUser;
          dispatch(
            addUser({
            uid:uid ,
            email:email ,
            displayName:displayName,
            photoURL:photoURL,
          }));
        }).catch((error) => {
          errorMessage(error.message);
        });
        
       })
       .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+errorMessage);
      });


    }
    else{
      //SignInLogic
      signInWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);


  });

    }

  };

  const toggleSignInform = () =>{
    setisSignInForm(!isSignInForm);

  };



  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="w-[1950px] h-[953px]" src={BACKGROUND_IMG} alt="img"></img>
      </div>
      <form onSubmit={(e)=>e.preventDefault()}
       className="w-[450px] h-[600px] p-12 bg-black bg-opacity-70 absolute my-36 mx-auto right-0 left-0 font-sans">
        <h1 className="font-bold text-3xl py-6 text-center text-white">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input ref={name} type="text" placeholder="Your Name" className="p-4 m-3 w-full bg-gray-700 rounded-lg text-white"></input>}
        <input ref={email} type="text" placeholder="Email Address" className="p-4 m-3 w-full bg-gray-700 rounded-lg text-white"></input>
        <input ref={password} type="password" placeholder="Password" className="p-4 m-3 w-full  bg-gray-700 rounded-lg   text-white"></input>
        <p className='text-red-500 mx-4 font-semibold'>{errorMessage}</p>
        <button className="p-3 m-3 bg-red-700 rounded-lg w-full font-semibold text-white" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

        <p className="py-3 mx-5 text-white cursor-pointer font-semibold" 
        onClick={toggleSignInform}>
          {isSignInForm ? "New to Netflix ? Sign Up Now" : "Already Registered ? Sign In Now"}
          </p>

      </form>
    </div>
  )
}

export default LoginPage;