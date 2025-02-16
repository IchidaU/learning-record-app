import '@testing-library/jest-dom';
import {
  screen,
  fireEvent,
  render,
  waitFor,
  cleanup,
} from '@testing-library/react';
import App from '../App';
import { TotalTimeProvider } from '../Providers/TotalTimeProvider';
import { deleteRecord, getAllLogs } from '../utils/supabaseFunctions';

jest.setTimeout(20000);

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
        const logs = screen.getAllByTestId('log');
        expect(logs).toHaveLength(1);
      },
      { timeout: 5000 }
    );

    const logs = screen.getAllByTestId('log');
    expect(logs[0]).toHaveTextContent('test1 1時間');

    expect(deleteRecord).toHaveBeenCalledWith(2);
    expect(getAllLogs).toHaveBeenCalledTimes(2);
  });
});
