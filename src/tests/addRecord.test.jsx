import '@testing-library/jest-dom';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { TotalTimeProvider } from '../Providers/TotalTimeProvider';
import { addRecord, getAllLogs } from '../utils/supabaseFunctions';

const mockLogs = [{ id: 1, title: 'test', time: 1 }];

jest.mock('../utils/supabaseFunctions', () => ({
  getAllLogs: jest.fn(() => Promise.resolve(mockLogs)),
  addRecord: jest.fn((title, time) => {
    const newLog = { id: mockLogs.length + 1, title, time };
    mockLogs.push(newLog);
    return Promise.resolve(newLog);
  }),
}));

describe('動作テスト', () => {
  it('記録追加', async () => {
    const user = userEvent.setup();

    render(
      <TotalTimeProvider>
        <App />
      </TotalTimeProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('log')).toHaveTextContent('test 1時間');
    });

    await user.type(screen.getByLabelText('学習内容'), 'test2');
    await user.type(screen.getByLabelText('学習時間'), '2');
    await user.click(screen.getByText('登録'));

    await waitFor(() => {
      const logs = screen.getAllByTestId('log');
      expect(logs).toHaveLength(2);
    });

    const logs = screen.getAllByTestId('log');
    expect(logs[1]).toHaveTextContent('test2 2時間');

    expect(addRecord).toHaveBeenCalledWith('test2', 2);
    expect(getAllLogs).toHaveBeenCalledTimes(2);
  });
});
