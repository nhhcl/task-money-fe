import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">🌿 Task Manager</div>

      <div className="nav-links">
        <Link to="/">Người dùng</Link>
        <Link to="/tasks">Loại nhiệm vụ</Link>
        <Link to="/manager">Quản lý Task</Link>

      </div>
    </div>
  )
}

export default Navbar
