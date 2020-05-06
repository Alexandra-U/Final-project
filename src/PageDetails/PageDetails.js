import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PageDetails({ pageId }) {
  const [page, setPage] = useState(null);

  useEffect(() => {
    getPageById();
  }, []);

  async function getPageById() {
    try {
      const res = await axios("http://localhost:4000/posts/" + pageId);
      setPage(res.data);
    } catch (e) {
      console.warn(e);
    }
  }

  if (!page) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <h1>I'm here</h1>
      <img src={page.Poster} alt="Image detail" />
      <h2>{page.Title}</h2>
    </>
  );
}
