import React, { useEffect } from "react";
import "./SportModal.css";

const AddSportModal = ({ setModalOpen }) => {
  useEffect(() => {}, []);
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="container">
      <button className="close" onClick={closeModal}>
        X
      </button>
      <p>모달창입니다.</p>
    </div>
  );
};

export default AddSportModal;
