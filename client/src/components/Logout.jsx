import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const Logout = () => {
  const navigate = useNavigate();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      navigate("/");
    })
    .catch((error) => {
      // An error happened.
      console.error(error);
    });

  return null;
};

export default Logout;