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

  function changeImage() {
    if(document.querySelector(".profile-image").src = {profile}) {
      document.querySelector(".profile-image").src = "https://i.pinimg.com/564x/7b/7f/b5/7b7fb54fbf3304571afae67453f882b5.jpg";
    } else {
      document.querySelector(".profile-image").src = {profile}
    }
  }

  return (
 
    <div className = "profile-container">
      {posts.map((item) => (
        <img className="profile-folder" src={item.Poster} key={item.id} />
      ))}
      <div className="profile-image" onClick = {changeImage} />
      
    </div>
  );
}

export default Profile;
