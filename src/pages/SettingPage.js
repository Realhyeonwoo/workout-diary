import React from "react";
import { Link } from "react-router-dom";

const SettingPage = () => {
  return (
    <div>
      <h1>SettingPage</h1>
      <button><Link to="/setting/login">로그인</Link></button>
      <button><Link to="/setting/sport">운동 편집</Link></button>
      <button><Link to="/setting/category">카테고리 편집</Link></button>
    </div>
  );
};
export default SettingPage;