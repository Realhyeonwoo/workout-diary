import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const activeStyle = {
    color: "red",
  };
  return (
    <>
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        로그
      </NavLink>
      <NavLink
        to="/routine"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        루틴
      </NavLink>
      <NavLink
        to="/static"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        통계
      </NavLink>
      <NavLink
        to="/setting"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        세팅
      </NavLink>
    </>
  );
};

export default Navigation;
