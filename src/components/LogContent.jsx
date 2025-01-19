import { useState, useEffect, useContext } from 'react';
import { getAllLogs } from '../utils/supabaseFunctions';
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
        console.log('record.time:', record.time);
        return sum + record.time;
      }, 0);
      setTotalTime(total);
      console.log('Calculated Total Time:', total);
    } else {
      setTotalTime(0);
    }
  }, [logs]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h2>学習記録一覧</h2>
      {logs.map((log) => (
        <p key={log.id}>
          {log.title} {log.time}時間
        </p>
      ))}
    </div>
  );
};
