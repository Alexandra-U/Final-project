import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditTitle({ pageId }) {
  const [page, setPage] = useState(null);

  useEffect(() => {
    getPage();
  }, []);

  async function getPage() {
    const res = await axios("http://localhost:4000/posts/" + pageId);
    setPage(res.data);

    // console.log(res);
  }

  function handleInputChange(e) {
    setPage({ ...page, Title: e.currentTarget.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.patch("http://localhost:4000/posts/" + pageId, { 
    Title: page.Title
    });
  }

  function refreshPage() {
    window.location.reload();
  }


  if (!page) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className = "modal-div">
    <input 
        className="modal-input"
        onChange={handleInputChange}
        value={page.Title}
        type="text"
        id="title"
        size = "12"
      />
      <button onClick = {refreshPage} className="modal-btn" type="submit">
        </button>
        </div>

        <a href = {page.Poster}  download>
          <img src = {page.Poster} alt = "Image poster"  /> 
          </a> 
      
      <div className = "modal-description">
      <a href = {page.link}> 
        <h5>From {page.label}</h5> 
      </a>
        <h6>{page.description}</h6>
      
      </div>
    </form>

    </>
  );
}
