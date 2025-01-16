import { useState, useEffect } from 'react';
import { getAllLogs } from '../utils/supabaseFunctions';

export const LogContent = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

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

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h2>学習記録一覧</h2>
        {logs.map((log) => (
          <p key={log.id}>
            {log.title} {log.time}時間
          </p>
        ))}
      </div>
    );
  }
};
