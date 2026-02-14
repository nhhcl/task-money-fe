import { useState } from "react"
import "./Users.css"
import { addUserApi, searchUserApi } from "../services/userService"

function Users() {
  // ===== GET DEFAULT DATES =====
  const today = new Date()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  const formatDate = (date) => date.toISOString().split("T")[0]

  const [users, setUsers] = useState([])
  const [name, setName] = useState("")

  const [fromDate, setFromDate] = useState(formatDate(firstDayOfMonth))
  const [toDate, setToDate] = useState(formatDate(today))

  const [loading, setLoading] = useState(false)

  // ===== ADD USER =====
  const addUser = async () => {
    if (!name.trim()) return

    try {
      const request = {
        fullName: name,
      }

      await addUserApi(request)

      alert("Thêm user thành công")
      setName("")
    } catch (error) {
      alert("Thêm user thất bại")
    }
  }

  // ===== SEARCH USER =====
  const handleSearch = async () => {
    try {
      setLoading(true)

      const request = {
        fullName: null,
        fromDate: fromDate || null,
        toDate: toDate || null,
        userId: null,
      }

      const result = await searchUserApi(request)

      setUsers(result)
    } catch (error) {
      alert("Tìm kiếm thất bại")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">

      {/* ADD USER */}
      <div className="card">
        <h3>Thêm người dùng</h3>

        <div className="form-row">
          <input
            placeholder="Nhập tên đầy đủ..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button onClick={addUser}>Thêm</button>
        </div>
      </div>

      {/* FILTER */}
      <div className="card">
        <h3>Lọc theo khoảng ngày</h3>

        <div className="filter-row">
          <div className="filter-item">
            <label>Từ ngày</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label>Đến ngày</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <button onClick={handleSearch}>
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="card">
        <h3>Danh sách người dùng</h3>

        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Tổng điểm</th>
                <th>Hạn mức hiện tại</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.fullName}</td>
                  <td>{u.totalPoint}</td>
                  <td>{u.currentPointLimit}</td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="3" className="empty">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}

export default Users
