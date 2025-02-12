import { useState, useEffect, useContext } from 'react';
import { deleteRecord, getAllLogs } from '../utils/supabaseFunctions';
import { TotalTimeContext } from '../Providers/TotalTimeProvider';

export const LogContent = ({ refreshTrigger }) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { totalTime, setTotalTime } = useContext(TotalTimeContext);

  const getLogs = async () => {
    try {
      setIsLoading(true);
      const fetchedLogs = await getAllLogs();
      setLogs(fetchedLogs);
      const total = fetchedLogs.reduce((sum, record) => sum + record.time, 0);
      setTotalTime(total);
    } catch (error) {
      console.error('読込エラーです', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLogs();
  }, [refreshTrigger]);

  const onClickDelete = async (id) => {
    try {
      await deleteRecord(id);
      await getLogs();
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
        <p key={log.id} data-testid="log">
          {log.title} {log.time}時間
          <button onClick={() => onClickDelete(log.id)}>削除</button>
        </p>
      ))}
    </div>
  );
};
