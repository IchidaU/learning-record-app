import '@testing-library/jest-dom';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import App from '../App';
import { TotalTimeProvider } from '../Providers/TotalTimeProvider';
import { getAllLogs } from '../utils/supabaseFunctions';
import { onClickDelete } from '../components/LogContent';

jest.setTimeout(20000);

const mockLogs = [
  { id: 1, title: 'test', time: 1 },
  { id: 2, title: 'test2', time: 2 },
];

jest.mock('../utils/supabaseFunctions', () => ({
  getAllLogs: jest.fn(() => Promise.resolve(mockLogs)),
  onClickDelete: jest.fn(() => {}),
}));

describe('動作テスト', () => {
  it('記録削除', async () => {
    render(
      <TotalTimeProvider>
        <App />
      </TotalTimeProvider>
    );

    await waitFor(
      () => {
        expect(screen.getAllByTestId('log')).toHaveLength(2);
      },
      { timeout: 5000 }
    );

    const deleteButton = screen.getAllByText('削除');
    fireEvent.click(deleteButton[1]);

    await waitFor(
      () => {
        const logs = screen.getByTestId('log');
        expect(logs).toHaveLength(1);
      },
      { timeout: 5000 }
    );

    const logs = screen.getAllByTestId('log');
    expect(logs[0]).toHaveTextContent('test1 1時間');

    expect(onClickDelete).toHaveBeenCalledWith(mockLogs[1].id);
    expect(getAllLogs).toHaveBeenCalledTimes(1);
  });
});
