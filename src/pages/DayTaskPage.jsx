import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./DayTaskPage.css"

function DayTaskPage({ selectedUser, taskData, setTaskData }) {
  const { dateKey } = useParams()
  const navigate = useNavigate()

  const dayData = taskData[dateKey] || { paid: false, tasks: [] }

  const [tasks, setTasks] = useState(dayData.tasks)
  const [newTaskName, setNewTaskName] = useState("")
  const [newTaskPoint, setNewTaskPoint] = useState("")

  /* =============================
     SYNC DATA
  ============================== */
  const syncToParent = (updatedTasks) => {
    setTaskData((prev) => ({
      ...prev,
      [dateKey]: {
        paid: prev[dateKey]?.paid || false,
        tasks: updatedTasks,
      },
    }))
  }

  /* =============================
     ADD TASK (AUTO COMPLETED)
  ============================== */
  const handleAddTask = () => {
    if (!newTaskName || !newTaskPoint) return

    const updated = [
      ...tasks,
      {
        name: newTaskName,
        point: Number(newTaskPoint),
        completed: true, // 🔥 AUTO COMPLETE
      },
    ]

    setTasks(updated)
    syncToParent(updated)

    setNewTaskName("")
    setNewTaskPoint("")
  }

  /* =============================
     DELETE TASK
  ============================== */
  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index)
    setTasks(updated)
    syncToParent(updated)
  }

  /* =============================
     EDIT TASK
  ============================== */
  const handleEdit = (index, field, value) => {
    const updated = [...tasks]
    updated[index][field] =
      field === "point" ? Number(value) : value
    setTasks(updated)
    syncToParent(updated)
  }

  /* =============================
     TOTAL POINT (ALL TASKS)
  ============================== */
  const totalPoint = tasks.reduce(
    (sum, t) => sum + t.point,
    0
  )

  return (
    <div className="day-page">

      <div className="page-header">
        <button onClick={() => navigate(-1)}>← Quay lại</button>
        <h2>Thêm nhiệm vụ cho {dateKey}</h2>
        <div className="user-label">Người dùng: {selectedUser}</div>
      </div>

      {/* ADD FORM */}
      <div className="add-form">
        <input
          type="text"
          placeholder="Tên nhiệm vụ"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Điểm"
          value={newTaskPoint}
          onChange={(e) => setNewTaskPoint(e.target.value)}
        />
        <button onClick={handleAddTask}>Thêm</button>
      </div>

      {/* TASK TABLE */}
      <table className="task-table">
        <thead>
          <tr>
            <th>Tên nhiệm vụ</th>
            <th>Điểm</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) =>
                    handleEdit(index, "name", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={task.point}
                  onChange={(e) =>
                    handleEdit(index, "point", e.target.value)
                  }
                />
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="day-summary">
        Tổng điểm: <strong>{totalPoint} đ</strong>
      </div>
    </div>
  )
}

export default DayTaskPage
