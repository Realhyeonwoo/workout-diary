import React from "react";
import "./SportModal.css";

const EditSportModal = ({ setModalOpen, sport }) => {
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="container">
      <button className="close" onClick={closeModal}>
        X
      </button>
      <p>편집모달창입니다.</p>
      <h3>{sport.name}</h3>
      <h3>{sport.category}</h3>
    </div>
  );
};

export default EditSportModal;
