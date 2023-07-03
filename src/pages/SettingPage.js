import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { authService } from "../fbase";

const SettingPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const loginGoogle = async () => {
    const data = await authService.signInWithPopup(new GoogleAuthProvider());
    console.log(data);
    console.log(data.user.uid);
    console.log(data.user.displayName);
    localStorage.setItem("uid", data.user.uid);
    localStorage.setItem("username", data.user.displayName);
    setIsLogin(true);
  };

  const logoutGoogle = () => {
    authService.signOut();
    localStorage.removeItem("uid");
    localStorage.removeItem("username");
    setIsLogin(false);
    window.location.replace("/setting");
  }

  return (
    <div>
      <h1>SettingPage</h1>
      {isLogin ? (<div><p>{localStorage.getItem("username")}</p><button onClick={logoutGoogle}>로그아웃</button></div>) : (
        <button onClick={loginGoogle}>구글 로그인</button>
      )}
      <button><Link to="/setting/sport">운동 편집</Link></button>
      <button><Link to="/setting/category">카테고리 편집</Link></button>
    </div>
  );
};
export default SettingPage;