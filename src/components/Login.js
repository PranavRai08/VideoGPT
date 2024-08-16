import { useRef, useState } from "react";
import Header from "../components/Header";
import {checkValidaDate} from "../validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../firebase";
import { useNavigate } from "react-router-dom";
const Login = () =>{
    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () =>{
        setIsSignIn(!isSignIn); //True ko false
        console.log("click");
    }

    const handleButtonClick = () =>{
        //Validate the form data
        
       // console.log(email.current.value);
        //console.log(password.current.value);

        const message = checkValidaDate(email.current.value, password.current.value);
        //console.log(message);
        setErrorMessage(message);

        if(message) return;

        
        //sign in sign up logic

        if(!isSignIn){
            // Create a password-based account
            // sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            updateProfile(user, {
                displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
              }).then(() => {
                // Profile updated!
                navigate("/browse");
              }).catch((error) => {
                // An error occurred
                setErrorMessage(error.message);
              });
            console.log(user);
    
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
    
  });
        }
        else{
            // Sign in a user with an email address and password
            // sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                navigate("/browse");
            })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + " - " + errorMessage);
              });
        }
 
    };


    return(<>
    <div>
        <Header/>
        <div className="absolute">
        <img className="m-0 p-0" alt="background-image" aria-hidden="true" src="https://assets.nflxext.com/ffe/siteui/vlv3/21a8ba09-4a61-44f8-8e2e-70e949c00c6f/6678e2ea-85e8-4db2-b440-c36547313109/IN-en-20240722-POP_SIGNUP_TWO_WEEKS-perspective_WEB_3457a8b1-284d-4bb5-979e-2a2e9bb342b3_small.jpg" />
        </div>
        <form onSubmit={(e) => e.preventDefault()} action="" className="w-3/12 absolute p-12 my-36 mx-auto right-0 left-0 bg-black bg-opacity-80">
        <h1 className="font-bold text-white text-3xl py-4">{isSignIn ? "Sign In" : "Sign Up"}</h1>
        {!isSignIn && (<input type="text" placeholder="Full Name"  className="p-2 my-2 w-full bg-gray-700 text-white" required/>)}
            <input ref={email} type="email" placeholder="Email Address"  className="p-2 my-2 w-full bg-gray-700 text-white" required/>
            <input ref={password} type="password"  placeholder="Password"  className="p-2 my-2 w-full bg-gray-700 text-white" required/>
            {/* Password@123$%& */}
            <p className="text-red-500 text-xs font-bold">{errorMessage}</p>
            <button type="submit" className="p-2 my-6 w-full text-white bg-red-600" onClick={handleButtonClick}>{isSignIn ? "Sign In" : "Sign Up"}</button>
            <p onClick={toggleSignInForm} className="py-4 text-white text-xs font-bold cursor-pointer">{isSignIn ? "New on Watch Now? Sign Up Now" : "Already registered? Sign In Now"}</p>
        </form>
        
    </div>
    
    </>)
};

export default Login;