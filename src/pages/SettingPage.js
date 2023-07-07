import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { authService } from "../fbase";

const SettingPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("uid") !== null && localStorage.getItem("uid") !== undefined) {
      setIsLogin(true);
    }
  }, []);

  const loginGoogle = async () => {
    const data = await authService.signInWithPopup(new GoogleAuthProvider());
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
      {!isLogin ? (
        <button onClick={loginGoogle}>구글 로그인</button>
      ) : (
      <>
      <div><p>{localStorage.getItem("username")}</p><button onClick={logoutGoogle}>로그아웃</button></div>
      <button><Link to="/setting/sport">운동 편집</Link></button>
      <button><Link to="/setting/category">카테고리 편집</Link></button>
      </>
      )}
      </div>
  );
};
export default SettingPage;