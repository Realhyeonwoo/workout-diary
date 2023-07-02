import React, { useEffect, useState } from "react";
import AddSportModal from "../components/setting/AddSportModal";
import EditSportModal from "../components/setting/EditSportModal";

const SettingSportPage = () => {
  const [sports, setSports] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState();
  useEffect(() => {
    setSports([
      { name: "벤치프레스", category: "가슴" },
      { name: "스쿼트", category: "하체" },
      { name: "랫풀다운", category: "등" },
    ]);
  }, []);

  const addSport = () => {
    console.log("add sport");
    setAddModalOpen(true);
  };
  const editSport = (sport) => {
    console.log("edit sport");
    setSelectedSport(sport);
    setEditModalOpen(true);
  };
  return (
    <>
      <h1>운동 편집</h1>
      <button onClick={addSport}>운동 추가</button>
      <ul>
        {sports.map((v, idx) => {
          return (
            <li key={idx} onClick={() => editSport(v)}>
              {v.name}
            </li>
          );
        })}
      </ul>
      {addModalOpen && <AddSportModal setModalOpen={setAddModalOpen} />}
      {editModalOpen && (
        <EditSportModal setModalOpen={setEditModalOpen} sport={selectedSport} />
      )}
    </>
  );
};
export default SettingSportPage;
