import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import React, { useState, useRef, useEffect } from "react";
import { dbService } from "../fbase";
import EditCategoryModal from "../components/setting/EditCategoryModal"
import BackBtn from "../components/common/BackBtn"

const SettingCategoryPage = () => {
  const focusRef = useRef();
  const [newCategory, setNewCategory] = useState("");
  const [categorys, setCategorys] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  useEffect(() => {
    const q = query(
      collection(dbService, "categorys"),
      where("creatorId", "==", localStorage.getItem("uid")),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const categoryArr = snapshot.docs.map((data) => ({
        id: data.id,
        ...data.data(),
      }));
      setCategorys(categoryArr);
    });
  }, []);

  // 신규 카테고리 입력 이벤트
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewCategory(value);
  };
  // 신규 카테고리 추가 버튼 이벤트
  const obSubmit = async (event) => {
    event.preventDefault();
    //입력값 확인
    if (newCategory === undefined || newCategory.trim().length === 0) {
      setNewCategory("");
      alert("새로운 카테고리를 입력하세요");
      focusRef.current.focus();
      return;
    }
    //중복값 확인
    const isExist = await getDocs(
      await query(
        collection(dbService, "categorys"),
        where("title", "==", newCategory.trim())
      )
    );
    if (!isExist.empty) {
      alert("이미 존재하는 카테고리명 입니다.");
      return;
    }
    //DB에 저장
    await addDoc(collection(dbService, "categorys"), {
      title: newCategory.trim(),
      creatorId: localStorage.getItem("uid"),
      createdAt: Date.now(),
    });
    setNewCategory("");
  };

  // 기존 카테고리 편집 이벤트
  const onEditCategory = (category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  // 기존 카테고리 삭제 이벤트
  const onDeleteCategory = async (category) => {
    await deleteDoc(doc(dbService, "categorys", category.id));
  };

  return (
    <>
      <h1>SettingCategoryPage</h1>
      <BackBtn/>
      <form onSubmit={obSubmit}>
        <input
          type="text"
          placeholder="새로운 카테고리 입력"
          value={newCategory}
          onChange={onChange}
          ref={focusRef}
        />
        <input type="submit" value="추가"></input>
      </form>
      <ul>
        {categorys.map((category, idx) => (
          <li key={idx}>
            {category.title}
            <button onClick={() => onEditCategory(category)}>편집</button>
            <button onClick={() => onDeleteCategory(category)}>삭제</button>
          </li>
        ))}
      </ul>
      {editModalOpen && (
        <EditCategoryModal setModalOpen={setEditModalOpen} data={selectedCategory} />
      )}
    </>
  );
};
export default SettingCategoryPage;
