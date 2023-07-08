import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "../../fbase";
import "./SportModal.css";

const EditSportModal = ({ setModalOpen, selectedSport }) => {
  const focusRef = useRef();
  const [categorys, setCategorys] = useState([]);
  const [category, setCategory] = useState(selectedSport.categoryId);
  const [sport, setSport] = useState(selectedSport.title);
  useEffect(() => {
    getCategorys();
  }, []);
  const getCategorys = async () => {
    const q = query(
      collection(dbService, "categorys"),
      where("creatorId", "==", localStorage.getItem("uid")),
      orderBy("createdAt", "desc")
    );
    const data = await getDocs(q);

    const categoryArr = data.docs.map((v) => {
      return {
        id: v.id,
        ...v.data(),
      };
    });
    setCategorys(categoryArr);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "sport") {
      setSport(value);
    } else {
      setCategory(value);
    }
  };
  const editSport = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, "sports", selectedSport.id), {
      title: sport,
      categoryId: category,
      createdAt: Date.now(),
    });
    closeModal();
  };
  return (
    <div className="container">
      <form>
        <input
          type="text"
          name="sport"
          value={sport}
          onChange={onChange}
          ref={focusRef}
        />
        <select name="category" onChange={onChange} value={category}>
          {categorys.map((v) => {
             return (
              <option value={v.id} key={v.id}>
                {v.title}
              </option>
             );
          })}
        </select>
        <button type="submit" onClick={editSport}>
          수정
        </button>
        <button type="button" onClick={closeModal}>
          취소
        </button>
      </form>
    </div>
  );
};

export default EditSportModal;
