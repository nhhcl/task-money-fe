import { useState } from "react"
import "./TaskDashboard.css"
import { useNavigate } from "react-router-dom"

function TaskDashboard({
  selectedUser,
  setSelectedUser,
  taskData,
  setTaskData,
}) {
  const navigate = useNavigate()

  const today = new Date()

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  )

  const [open, setOpen] = useState(false)

  const users = ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C"]

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay()

  /* =============================
     FORMAT DATE KEY
  ============================== */

  const formatDateKey = (day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  /* =============================
     TÍNH ĐIỂM NGÀY
  ============================== */

  const getDayPoint = (dateKey) => {
    const dayData = taskData[dateKey]
    if (!dayData) return null

    return dayData.tasks.reduce((sum, t) => sum + t.point, 0)
  }

  /* =============================
     TỔNG ĐIỂM THÁNG
  ============================== */

  const getMonthTotal = () => {
    return Object.keys(taskData)
      .filter((key) =>
        key.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)
      )
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
     MARK PAID
  ============================== */

  const markPaid = (dateKey, e) => {
    e.stopPropagation() // 🔥 tránh click coin bị navigate

    if (!taskData[dateKey]) return

    setTaskData((prev) => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        paid: true,
      },
    }))
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
    <div className="dashboard">

      {/* HEADER */}
      <div className="header">

        <div className="month-nav">
          <button className="month-btn" onClick={goPrevMonth}>←</button>
          <div className="month-label">{getMonthName()}</div>
          <button className="month-btn" onClick={goNextMonth}>→</button>
        </div>

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

          const dayData = taskData[key]
          const totalPoint = getDayPoint(key)
          const isPaid = dayData?.paid

          let dayClass = "day"

          if (!dayData) {
            dayClass += " no-data"
          } else if (totalPoint >= 10) {
            dayClass += " good-day"
          } else {
            dayClass += " bad-day"
          }

          return (
            <div
              key={day}
              className={dayClass}
              onClick={() => navigate(`/day/${key}`)}
            >
              <div className="day-number">{day}</div>

              {totalPoint !== null && (
                <div className="day-point">{totalPoint}đ</div>
              )}

              <div className="day-actions">
                <button
                  className={`mini-btn coin-btn ${isPaid ? "active" : ""}`}
                  onClick={(e) => markPaid(key, e)}
                  disabled={isPaid}
                  title="Đã thanh toán"
                >
                  🪙
                </button>
              </div>

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
