import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import LogPage from "./pages/LogPage";
import RoutinePage from "./pages/RoutinePage";
import StaticPage from "./pages/StaticPage";
import SettingPage from "./pages/SettingPage";
import SettingSportPage from "./pages/SettingSportPage";
import SettingCategoryPage from "./pages/SettingCategoryPage";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<LogPage />} />
        <Route path="/routine" element={<RoutinePage />} />
        <Route path="/static" element={<StaticPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/setting/sport" element={<SettingSportPage />} />
        <Route path="/setting/category" element={<SettingCategoryPage />} />
        <Route path="*" element={<SettingPage />} />
      </Routes>
    </>
  );
}
export default App;
