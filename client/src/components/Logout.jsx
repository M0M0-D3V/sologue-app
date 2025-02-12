import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../firebaseConfig";

signOut(auth)
  .then(() => {
    // Sign-out successful - navigate to /
    let navigate = useNavigate();
    navigate("/");
  })
  .catch((error) => {
    // An error happened.
    console.error(error);
  });
