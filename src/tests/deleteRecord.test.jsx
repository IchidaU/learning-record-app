import '@testing-library/jest-dom';
import { screen, render, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { TotalTimeProvider } from '../Providers/TotalTimeProvider';
import { deleteRecord, getAllLogs } from '../utils/supabaseFunctions';

let mockLogs = [];

jest.mock('../utils/supabaseFunctions', () => ({
  getAllLogs: jest.fn(() => Promise.resolve(mockLogs)),
  deleteRecord: jest.fn((id) => {
    mockLogs = mockLogs.filter((log) => log.id !== id);
    return Promise.resolve();
  }),
}));

beforeEach(() => {
  mockLogs = [
    { id: 1, title: 'test1', time: 1 },
    { id: 2, title: 'test2', time: 2 },
  ];
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('動作テスト', () => {
  it('記録削除', async () => {
    const user = userEvent.setup();

    render(
      <TotalTimeProvider>
        <App />
      </TotalTimeProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('log')).toHaveLength(2);
    });

    const deleteButton = screen.getAllByText('削除');
    await user.click(deleteButton[1]);

    await waitFor(() => {
      const logs = screen.getAllByTestId('log');
      expect(logs).toHaveLength(1);
    });

    const logs = screen.getAllByTestId('log');
    expect(logs[0]).toHaveTextContent('test1 1時間');

    expect(deleteRecord).toHaveBeenCalledWith(2);
    expect(getAllLogs).toHaveBeenCalledTimes(2);
  });
});
