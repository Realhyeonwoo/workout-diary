import { updateDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../../fbase";
import "./SportModal.css";

const EditCategoryModal = ({ setModalOpen, data }) => {
  const [title, setTitle] = useState(data.title);
  const closeModal = () => {
    setModalOpen(false);
  };
  const editCategory = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, "categorys", data.id), {
      title,
    });
    closeModal();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
  };
  return (
    <div className="container">
      <form>
        <input type="text" value={title} onChange={onChange} />
        <button type="submit" onClick={editCategory}>수정</button>
        <button type="button" onClick={closeModal}>취소</button>
      </form>
    </div>
  );
};

export default EditCategoryModal;
