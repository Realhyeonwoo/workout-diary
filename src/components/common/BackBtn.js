import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackBtn() {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  return (
    <>
      <button onClick={back}>뒤로가기</button>
    </>
  );
}
