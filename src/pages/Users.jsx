import { useState } from "react"
import "./Users.css"

function Users() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState("")
  const [point, setPoint] = useState("")

  const addUser = () => {
    if (!name || !point) return
    setUsers([...users, { id: Date.now(), name, point }])
    setName("")
    setPoint("")
  }

  return (
    <div className="page">
      <div className="card">
        <h3>Thêm người dùng</h3>
        <input
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Điểm"
          value={point}
          onChange={(e) => setPoint(e.target.value)}
        />
        <button onClick={addUser}>Thêm</button>
      </div>

      <div className="card">
        <h3>Danh sách</h3>
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Điểm</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.point}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
