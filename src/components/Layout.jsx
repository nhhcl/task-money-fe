import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
