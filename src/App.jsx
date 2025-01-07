import { useEffect, useState } from 'react'
import { getAllLogs } from './utils/supabaseFunctions'

export const App = () => {
  const [records, setRecords] = useState([])
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [error, setError] = useState("");
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const getLogs = async () => {
      const logs = await getAllLogs()
      setLogs(logs)
      console.log(logs)
    }
    getLogs()
  },[])

  const onChangeTitle = (e) => setTitle(e.target.value)
  const onChangeTime = (e) => setTime(parseInt(e.target.value))

  const onClickAdd = () => {
    const newRecord = [...records, { title, time }]
    if (title && time) {
      setRecords(newRecord)
      setTitle("")
      setTime("")
      setError("")
    } else {
      setError("入力されていない項目があります")
    }
  }

  const total = records.reduce((current, item) => current + item.time, 0)

  return (
    <div>
      <h1>学習記録一覧</h1>
        <div>
          <label>
            学習内容
            <input 
              type="text" 
              value={title} 
              onChange={onChangeTitle} 
            />
          </label>
        </div>
        <div>
          <label>
            学習時間
            <input 
              type="number" 
              value={time} 
              onChange={onChangeTime}
              min="0" 
            />
          </label>
        </div>
        <button onClick={onClickAdd}>追加</button>
      <div>
        入力されている学習内容：{title}
      </div>
      <div>
        入力されている学習時間：{time}
      </div>
      <div>
        {error}
      </div>
      <div>
        <p>合計時間: {total} /1000 (h)</p>
      </div>
      <div>
        {records.map((record) => (
          <div key={record}>
            <h2>{record.title}</h2>
            <p>学習時間: {record.time}時間</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App