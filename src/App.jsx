import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Users from "./pages/Users"
import Tasks from "./pages/TaskTypes"
import TaskDashboard from "./pages/TaskDashboard"
import DayTaskPage from "./pages/DayTaskPage"
import { useState } from "react"
import "./App.css"

function App() {
  const [selectedUser, setSelectedUser] = useState("Nguyễn Văn A")
  const [taskData, setTaskData] = useState({ "2026-02-03": { paid: false, tasks: [ { name: "Rửa chén", point: 3, completed: true }, { name: "Nấu ăn", point: 5, completed: true }, ], }, "2026-02-05": { paid: false, tasks: [ { name: "Học bài", point: 6, completed: true }, { name: "Làm bài tập", point: 5, completed: true }, ], }, })

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<Users />} />

          <Route path="/tasks" element={<Tasks />} />

          {/* Dashboard */}
          <Route
            path="/manager"
            element={
              <TaskDashboard
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                taskData={taskData}
                setTaskData={setTaskData}
              />
            }
          />

          {/* Day detail page */}
          <Route
            path="/day/:dateKey"
            element={
              <DayTaskPage
                selectedUser={selectedUser}
                taskData={taskData}
                setTaskData={setTaskData}
              />
            }
          />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App
