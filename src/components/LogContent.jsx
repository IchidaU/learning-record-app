import { useState, useEffect } from 'react';
import { getAllLogs } from '../utils/supabaseFunctions';

export const LogContent = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const fetchedLogs = await getAllLogs();
        console.log('fetchedLogs', fetchedLogs);
        setLogs(fetchLogs);
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  console.log('Current logs:', logs);
  console.log('Is loading:', isLoading);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div>
        <p>No logs found.</p>
      </div>
    );
  }

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

  // useEffect(() => {
  //   setIsLoading(true);
  //   const getLogs = async () => {
  //     const logs = await getAllLogs();
  //     setLogs(logs);
  //   };
  //   getLogs();
  //   setIsLoading(false);
  //   console.log(isLoading);
  // }, []);
};
