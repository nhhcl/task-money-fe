import { useState } from "react"
import "./TaskDashboard.css"

function TaskDashboard() {
  const today = new Date()

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  )

  const [selectedUser, setSelectedUser] = useState("Nguyễn Văn A")
  const [open, setOpen] = useState(false)
  const [paid, setPaid] = useState(false)

  const users = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C"]

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay()

  /* =============================
     TASK DATA STATE
  ============================== */

  const [taskData, setTaskData] = useState({
    "2026-02-03": [
      { name: "Rửa chén", point: 3, completed: true },
      { name: "Nấu ăn", point: 5, completed: true },
    ],
    "2026-02-05": [
      { name: "Học bài", point: 6, completed: true },
      { name: "Làm bài tập", point: 5, completed: true },
    ],
  })

  const formatDateKey = (day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const getDayPoint = (dateKey) => {
    const tasks = taskData[dateKey] || []
    if (tasks.length === 0) return null
    return tasks
      .filter(t => t.completed)
      .reduce((sum, t) => sum + t.point, 0)
  }

  const getMonthTotal = () => {
    return Object.keys(taskData)
      .filter(key => key.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
      .reduce((sum, key) => sum + (getDayPoint(key) || 0), 0)
  }

  const getGoodDays = () => {
    let count = 0
    for (let i = 1; i <= daysInMonth; i++) {
      const point = getDayPoint(formatDateKey(i))
      if (point && point >= 10) count++
    }
    return count
  }

  /* =============================
     ADD TASK
  ============================== */

  const addTaskToday = () => {
    if (paid) return

    const name = prompt("Tên nhiệm vụ?")
    const point = Number(prompt("Số điểm?"))

    if (!name || !point) return

    const todayKey = formatDateKey(today.getDate())

    const updated = {
      ...taskData,
      [todayKey]: [
        ...(taskData[todayKey] || []),
        { name, point, completed: true },
      ],
    }

    setTaskData(updated)
  }

  /* =============================
     MONTH NAVIGATION
  ============================== */

  const goPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getMonthName = () => {
    return `Tháng ${month + 1} / ${year}`
  }

  return (
    <div className={`dashboard ${paid ? "gold-theme" : ""}`}>

      {/* HEADER */}
      <div className="header">

        <div className="month-nav">
          <button className="month-btn" onClick={goPrevMonth}>←</button>
          <div className="month-label">{getMonthName()}</div>
          <button className="month-btn" onClick={goNextMonth}>→</button>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>

          {/* ADD TASK BUTTON */}
          <button 
            className="icon-btn"
            onClick={addTaskToday}
            disabled={paid}
            title="Thêm nhiệm vụ"
          >
            ➕
          </button>

          {/* PAID BUTTON */}
          <button
            className={`icon-btn coin ${paid ? "active" : ""}`}
            onClick={() => setPaid(true)}
            title="Đã chuyển tiền"
          >
            🪙
          </button>

          {/* USER DROPDOWN */}
          <div className="dropdown">
            <div className="dropdown-btn" onClick={() => setOpen(!open)}>
              {selectedUser}
              <span>⌄</span>
            </div>

            {open && (
              <div className="dropdown-menu">
                {users.map((user) => (
                  <div
                    key={user}
                    className="dropdown-item"
                    onClick={() => {
                      setSelectedUser(user)
                      setOpen(false)
                    }}
                  >
                    {user}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* WEEK HEADER */}
      <div className="weekdays">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
          <div key={d} className="weekday">{d}</div>
        ))}
      </div>

      {/* CALENDAR */}
      <div className="calendar">

        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={"empty" + i}></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const key = formatDateKey(day)

          const tasks = taskData[key] || []
          const completed = tasks.filter(t => t.completed)
          const totalPoint = getDayPoint(key)

          let dayClass = "day"

          if (!tasks.length) {
            dayClass += " no-data"
          } else if (totalPoint >= 10) {
            dayClass += " good-day"
          } else {
            dayClass += " bad-day"
          }

          return (
            <div key={day} className={dayClass}>
              <div className="day-number">{day}</div>

              {totalPoint !== null && (
                <div className="day-point">{totalPoint}đ</div>
              )}

              {completed.length > 0 && (
                <div className="task-preview">
                  {completed.map((task, index) => (
                    <div key={index} className="task-line">
                      • {task.name} ({task.point}đ)
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* SUMMARY */}
      <div className="month-summary">
        <div className="stat-box">
          <div className="stat-title">Tổng điểm tháng</div>
          <div className="stat-value">{getMonthTotal()} đ</div>
        </div>

        <div className="stat-box">
          <div className="stat-title">Số ngày ≥ 10 điểm</div>
          <div className="stat-value">{getGoodDays()} ngày</div>
        </div>
      </div>

    </div>
  )
}

export default TaskDashboard
