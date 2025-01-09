import { useEffect, useState } from 'react';
import { getAllLogs } from '../utils/supabaseFunctions';

export const LogContent = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getLogs = async () => {
      const logs = await getAllLogs();
      setLogs(logs);
    };
    getLogs();
  }, []);

  return (
    <div>
      {logs.map((log) => (
        <p key={log.id}>
          {log.title} {log.time}時間
        </p>
      ))}
    </div>
  );
};
