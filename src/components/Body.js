
import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import {addUser} from "../userSlice";
import {removeUser} from "../userSlice";

const Body = () =>{
     const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/browse",
            element: <Browse/>
        }

    ]);

    
    // Get the currently signed-in user
    useEffect(() =>{
        // url: https://firebase.google.com/docs/auth/web/manage-users
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const {uid, email, displayName} = user;
              dispatch(addUser({uid: uid, email:email, displayName: displayName}));

            } else {
              // User is signed out
              // ...
              dispatch(removeUser());
            }
          });
    },[]);


    return(<>
    <div>
        <RouterProvider router={appRouter}></RouterProvider>
    </div>
    </>)
}
export default Body;