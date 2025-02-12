import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default signOut(auth)
  .then(() => {
    // Sign-out successful - navigate to /
  })
  .catch((error) => {
    // An error happened.
    console.error(error);
  });
