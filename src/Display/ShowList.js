import React, { useEffect, useState } from "react";
import axios from "axios";
import Display from "./Display";
import { useLocation } from "react-router-dom";

export default function ShowList() {
  const [page, setPage] = useState(null);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const q = useQuery().get("q");

  useEffect(() => {
    getPage();
  }, []);

  async function getPage() {
    const res = await axios("http://localhost:4000/posts/");
    setPage(res.data);

    console.log(res);
  }

  function handleDelete(id) {
    setPage(page.filter((pag) => pag.id !== Number(id)));
  }

  if (page) {
    return (
      <div className="wrapper">
        {page
          .filter((post) => (q ? post.Title.toLowerCase().includes(q) : true))
          .map((item) => (
            <Display show={item} onDelete={handleDelete} key={item.id} />
          ))}
      </div>
    );
  } else {
    return <h1>Loading ...</h1>;
  }
}
