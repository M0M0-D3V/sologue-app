// src/components/Profile.jsx
import React from "react";
import { auth } from "../firebaseConfig";

const Profile = () => {
  const user = auth.currentUser;
  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }
  const { displayName, email, photoURL } = user;
  return (
    <div className="profile">
      <h1>My Profile</h1>
      <img src={photoURL} alt={displayName} />
      <h2>{displayName}</h2>
      <p>Email: {email}</p>
      <p>Last Logged In: </p>
    </div>
  );
};

export default Profile;
