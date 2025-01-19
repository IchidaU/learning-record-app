import { createContext, useState } from 'react';

export const TotalTimeContext = createContext({
  totalTime: 0,
  setTotalTime: () => {},
});

export const TotalTimeProvider = ({ children }) => {
  const [totalTime, setTotalTime] = useState(0);
  return (
    <TotalTimeContext.Provider value={{ totalTime, setTotalTime }}>
      {children}
    </TotalTimeContext.Provider>
  );
};
