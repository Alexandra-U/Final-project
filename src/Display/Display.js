import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../Auth/AuthContext";

import Modal from "react-modal";
import EditTitle from "../CRUD/EditTitle";

Modal.setAppElement("#root");

export default function Display({ show, onDelete }) {
  const { user } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function handleSave() {
    await axios
      .post("http://localhost:4000/folders/", {
        userId: show.id,
        postId: show.id,
      })
      .then((resp) => {
        console.log(resp.data);
      });
  }

  async function deleteItem(e) {
    if (window.confirm("Are you sure?")) {
      const itemId = e.currentTarget.getAttribute("data-item-id");
      const res = await axios.delete("http://localhost:4000/posts/" + itemId);
      onDelete(itemId);
      //   console.log(res);
    }
  }

  return (
    <div className={"poster" + " row-" + show.height}>
      <div className="bar">
        {user ? (
          <>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
            >
              <EditTitle pageId={show.id} />
            </Modal>
            <button onClick={handleSave} data-image-id>
              +
            </button>
            <button onClick={() => setModalIsOpen(true)}>&#9998;</button>
            <button onDelete={deleteItem} data-item-id={show.id}>
              &#x2710;
            </button>
          </>
        ) : null}
      </div>
      <img src={show.Poster} alt="Image Poster" />
      <h5 className="title">{show.Title}</h5>
    </div>
  );
}
