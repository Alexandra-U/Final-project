import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import profile from "../Images/profile.png";

function Profile() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    getSaved();
  }, [user]);

  async function getSaved() {
    if (!user) {
      return;
    }
    const folders = await axios
      .get("http://localhost:4000/folders?userId=" + user.id)
      .then((res) => res.data);
    console.log(folders, user.id);

    const postPromises = folders.map((folder) =>
      axios
        .get("http://localhost:4000/posts/" + folder.postId)
        .then((res) => res.data)
    );

    const posts = await Promise.all(postPromises);
    setPosts(posts);
  }

  return (
 
    <>
      {posts.map((item) => (
        <img className="profile-folder" src={item.Poster} key={item.id} />
      ))}
      <img className="profile-image" src={profile} alt="Profile" />
    </>
  );
}

export default Profile;
