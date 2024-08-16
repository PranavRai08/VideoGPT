import { signOut } from "firebase/auth";
import {auth} from "../firebase"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () =>{
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const handelSignOut = () =>{
        // To sign out a user:
        signOut(auth)
        .then(() => {
            // Sign-out successful.
            navigate("/");
          }).catch((error) => {
            // An error happened.
          });
    }
    return(<>
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-20 flex justify-between">
        <img className="w-20" src="https://png.pngtree.com/png-clipart/20230405/original/pngtree-watch-now-video-play-button-banner-transparent-background-png-image_9027018.png" alt="logo" />
        {user && <div className="flex p-2">
            <button onClick={handelSignOut} className="bg-red-500 rounded-sm text-white font-bold h-10 w-20 hover:bg-red-700 ">Sign Out</button>
        </div>}
    </div>
    
    </>)
};

export default Header;