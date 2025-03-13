// src/components/Profile.jsx
import React, { useEffect, useState } from "react";
import { getUserProfile } from "../firebaseFunctions";

const Profile = () => {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    lastLogin: "",
  });
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        if (profile) {
          setUser(profile);
          console.log("User profile fetched successfully:", profile);
        } else {
          console.log("No user profile found.");
        }
      } catch (e) {
        console.error("Error fetching user profile:", e);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="profile">
      <h1>My Profile</h1>
      <img src={user.photoURL} alt={user.displayName || "User"} />
      <h2>{user.displayName || "Anonymous"}</h2>
      <p>Email: {user.email || "No email provided"}</p>
      <p>Last Logged In: {user.lastLogin || "Unknown"}</p>
    </div>
  );
};

export default Profile;
