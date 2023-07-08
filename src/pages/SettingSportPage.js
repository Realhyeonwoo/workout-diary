import React, { useEffect, useState } from "react";
import AddSportModal from "../components/setting/AddSportModal";
import EditSportModal from "../components/setting/EditSportModal";
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { dbService } from "../fbase";
import BackBtn from "../components/common/BackBtn";

const SettingSportPage = () => {
  const [sports, setSports] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState();
  useEffect(() => {
    const q = query(
      collection(dbService, "sports"),
      where("creatorId", "==", localStorage.getItem("uid")),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const sportArr = snapshot.docs.map((data) => ({
        id: data.id,
        ...data.data(),
      }));
      setSports(sportArr);
    });
  }, []);

  const addSport = () => {
    setAddModalOpen(true);
  };
  const editSport = async (sport) => {
    setSelectedSport(sport);
    setEditModalOpen(true);
  };
  const deleteSport = async (sport) => {
    await deleteDoc(doc(dbService, "sports", sport.id));
  }
  return (
    <>
      <h1>운동 편집</h1>
      <BackBtn/>
      <button onClick={addSport}>운동 추가</button>
      <ul>
        {sports.map((sport, idx) => {
          return (
            <li key={idx}>
              {sport.title}
              <button onClick={() => editSport(sport)}>편집</button>
            <button onClick={() => deleteSport(sport)}>삭제</button>
            </li>
          );
        })}
      </ul>
      {addModalOpen && <AddSportModal setModalOpen={setAddModalOpen} />}
      {editModalOpen && (
        <EditSportModal setModalOpen={setEditModalOpen} selectedSport={selectedSport} />
      )}
    </>
  );
};
export default SettingSportPage;
