import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

 function Profile() {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    useEffect(() => { 
        console.log('Aici', user)
        getSaved();   
    }, [user]);

    async function getSaved() {
        if(!user) {
            return;
        }
        const folders = await axios.get('http://localhost:4000/folders?userId=' + user.id).then(res => res.data);
        console.log(folders, user.id);
        
        const postPromises = folders.map(folder => axios.get('http://localhost:4000/posts/' + folder.postId).then(res => res.data));

        const posts = await Promise.all(postPromises);
        setPosts(posts);
        console.log('Hello there ', posts);
    }

    return (
        <>
           {posts.map(item => <img src={item.Poster} key = {item.id} />)}
        </>
    );
    
} 

export default Profile;