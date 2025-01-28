import { useState, useEffect, useContext } from 'react';
import { deleteRecord, getAllLogs } from '../utils/supabaseFunctions';
import { TotalTimeContext } from '../Providers/TotalTimeProvider';

export const LogContent = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { totalTime, setTotalTime } = useContext(TotalTimeContext);

  useEffect(() => {
    const getLogs = async () => {
      try {
        setIsLoading(true);
        const fetchedLogs = await getAllLogs();
        setLogs(fetchedLogs);
      } catch (error) {
        console.error('読込エラーです', error);
      } finally {
        setIsLoading(false);
      }
    };
    getLogs();
  }, []);

  useEffect(() => {
    if (logs && logs.length > 0) {
      const total = logs.reduce((sum, record) => {
        return sum + record.time;
      }, 0);
      setTotalTime(total);
    } else {
      setTotalTime(0);
    }
  }, [logs]);

  const onClickDelete = async (id) => {
    try {
      await deleteRecord(id);
      setLogs(logs.filter((log) => log.id !== id));

      const updatedLogs = logs.filter((log) => log.id !== id);
      const newTotal = updatedLogs.reduce(
        (sum, record) => sum + record.time,
        0
      );
      setTotalTime(newTotal);
    } catch (error) {
      console.error('削除エラーです', error);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h2>学習記録一覧</h2>
      {logs.map((log) => (
        <p key={log.id}>
          {log.title} {log.time}時間
          <button onClick={() => onClickDelete(log.id)}>削除</button>
        </p>
      ))}
    </div>
  );
};
