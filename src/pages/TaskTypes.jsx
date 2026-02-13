import { useState } from "react"
import "./TaskTypes.css"

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [name, setName] = useState("")
  const [coef, setCoef] = useState("")
  const [image, setImage] = useState(null)

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }

  const addTask = () => {
    if (!name || !coef) return
    setTasks([...tasks, { id: Date.now(), name, coef, image }])
    setName("")
    setCoef("")
    setImage(null)
  }

  return (
    <div className="page">
      <div className="card">
        <h3>Thêm loại nhiệm vụ</h3>
        <input
          placeholder="Tên loại nhiệm vụ"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Hệ số"
          value={coef}
          onChange={(e) => setCoef(e.target.value)}
        />
        <input type="file" onChange={handleImage} />
        <button onClick={addTask}>Thêm</button>
      </div>

      <div className="card">
        <h3>Danh sách</h3>
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Hệ số</th>
              <th>Hình</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.coef}</td>
                <td>
                  {t.image && (
                    <img src={t.image} width="60" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Tasks
