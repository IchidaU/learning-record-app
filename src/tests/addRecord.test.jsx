import '@testing-library/jest-dom';
import {
  screen,
  fireEvent,
  render,
  waitFor,
  act,
} from '@testing-library/react';
import App from '../App';
import { TotalTimeProvider } from '../Providers/TotalTimeProvider';
import { addRecord, getAllLogs } from '../utils/supabaseFunctions';

jest.setTimeout(20000);

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
    await act(async () => {
      render(
        <TotalTimeProvider>
          <App />
        </TotalTimeProvider>
      );
    });

    await waitFor(
      () => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      },
      { timeout: 50000 }
    );

    await waitFor(
      () => {
        expect(screen.getByTestId('log')).toHaveTextContent('test 1時間');
      },
      { timeout: 50000 }
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText('学習内容'), {
        target: { value: 'test2' },
      });
      fireEvent.change(screen.getByLabelText('学習時間'), {
        target: { value: '2' },
      });
      fireEvent.click(screen.getByText('登録'));
    });

    await waitFor(
      () => {
        const logs = screen.getAllByTestId('log');
        expect(logs).toHaveLength(2);
      },
      { timeout: 5000 }
    );

    const logs = screen.getAllByTestId('log');
    expect(logs[1]).toHaveTextContent('test2 2時間');

    expect(addRecord).toHaveBeenCalledWith('test2', 2);
    expect(getAllLogs).toHaveBeenCalledTimes(2);
  });
});
