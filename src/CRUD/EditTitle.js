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

    console.log(res);
  }

  function handleInputChange(e) {
    setPage({ ...page, Title: e.currentTarget.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.patch("http://localhost:4000/posts/" + pageId, {
      Title: page.Title,
    });
  }

  if (!page) {
    return <h1>Loading...</h1>;
  }

  return (
    <form className="modal-form">
      <h1>Edit {page.Title}</h1>

      <input
        className="modal-input"
        onChange={handleInputChange}
        value={page.Title}
        type="text"
        id="title"
      />

      <p>
        <button className="modal-btn" onSubmit={handleSubmit} type="submit">
          Edit
        </button>
      </p>
    </form>
  );
}
