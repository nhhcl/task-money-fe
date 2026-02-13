import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Users from "./pages/Users"
import Tasks from "./pages/TaskTypes"
import "./App.css"
import TaskDashboard from "./pages/TaskDashboard"
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/manager" element={<TaskDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
