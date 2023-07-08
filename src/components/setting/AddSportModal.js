import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs, orderBy, query, where, addDoc } from "firebase/firestore";
import { dbService } from "../../fbase";
import "./SportModal.css";

const AddSportModal = ({ setModalOpen }) => {
  const focusRef = useRef();
  const [categorys, setCategorys] = useState([]);
  const [category, setCategory] = useState("");
  const [sport, setSport] = useState("");
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
    if(name === "sport") {
      setSport(value);
    } else {
      setCategory(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    //입력값 확인
    if(category === "") {
      alert("카테고리를 선택하세요");
      return;
    }
    if (sport === undefined || sport.trim().length === 0) {
      setSport("");
      alert("추가할 운동명을 입력하세요");
      focusRef.current.focus();
      return;
    }
    //중복값 확인
    const isExist = await getDocs(
      await query(
        collection(dbService, "sports"),
        where("title", "==", sport.trim())
      )
    );
    if (!isExist.empty) {
      alert("이미 존재하는 카테고리명 입니다.");
      return;
    }
    //DB에 저장
    await addDoc(collection(dbService, "sports"), {
      title: sport.trim(),
      categoryId: category,
      creatorId: localStorage.getItem("uid"),
      createdAt: Date.now(),
    });
    setSport("");
    closeModal();
  }
  return (
    <div className="container">
      {/* <button className="close" onClick={closeModal}>
        X
      </button> */}
      <form>
        <input type="text" name="sport" value={sport} onChange={onChange} ref={focusRef}/>
        <select name="category" onChange={onChange}>
          <option value="">카테고리</option>
          {categorys.map((v) => {
            return (
              <option value={v.id} key={v.id}>
                {v.title}
              </option>
            );
          })}
        </select>
        <button type="submit" onClick={onSubmit}>추가</button>
        <button type="button" onClick={closeModal}>취소</button>
      </form>
    </div>
  );
};

export default AddSportModal;
