import { useContext, useState } from 'react';
import { LogContent } from './components/LogContent';
import { addRecord } from './utils/supabaseFunctions';
import { TotalTimeContext } from './Providers/TotalTimeProvider';

export const App = () => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const { totalTime } = useContext(TotalTimeContext);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeTime = (e) => setTime(parseInt(e.target.value));

  const onClickAdd = async () => {
    if (title && time) {
      try {
        await addRecord(title, time);
        setTitle('');
        setTime('');
        setError('');
        setRefreshTrigger((prev) => prev + 1);
      } catch (error) {
        console.error('登録エラーです', error);
        setError('登録に失敗しました');
      }
    } else {
      setError('入力されていない項目があります');
    }
  };

  return (
    <>
      <title data-testid="title">Hello Jest</title>
      <div>
        <h1>学習記録アプリ</h1>
        <div>
          <label>
            学習内容
            <input type="text" value={title} onChange={onChangeTitle} />
          </label>
        </div>
        <div>
          <label>
            学習時間
            <input type="number" value={time} onChange={onChangeTime} min="0" />
          </label>
        </div>
        <div>入力されている学習内容：{title}</div>
        <div>入力されている学習時間：{time}</div>
        <div>{error}</div>
        <LogContent refreshTrigger={refreshTrigger} />
        <button onClick={onClickAdd}>登録</button>
        <div>
          <p>合計時間: {totalTime}/1000 (h)</p>
        </div>
      </div>
    </>
  );
};

export default App;
