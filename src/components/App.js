import { Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import LogPage from "../pages/LogPage";
import RoutinePage from "../pages/RoutinePage";
import StaticPage from "../pages/StaticPage";
import SettingPage from "../pages/SettingPage";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/log" element={<LogPage />} />
        <Route path="/routine" element={<RoutinePage />} />
        <Route path="/static" element={<StaticPage />} />
        <Route path="/" element={<SettingPage />} />
        <Route path="*" element={<SettingPage />} />
      </Routes>
    </>
  );
}
export default App;
