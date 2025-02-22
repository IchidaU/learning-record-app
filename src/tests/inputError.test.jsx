import '@testing-library/jest-dom';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { TotalTimeProvider } from '../Providers/TotalTimeProvider';
import { getAllLogs } from '../utils/supabaseFunctions';

jest.mock('../utils/supabaseFunctions', () => ({
  getAllLogs: jest.fn(() => Promise.resolve([])),
  onClickAdd: jest.fn(() => Promise.resolve()),
}));

describe('動作テスト', () => {
  const user = userEvent.setup();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('titleエラー', async () => {
    render(
      <TotalTimeProvider>
        <App />
      </TotalTimeProvider>
    );

    await user.type(screen.getByLabelText('学習時間'), '1');
    await user.click(screen.getByText('登録'));

    await waitFor(() => {
      const error = screen.getByText('入力されていない項目があります');
      expect(error).toBeInTheDocument();
    });

    const logs = screen.queryAllByTestId('log');
    expect(logs).toHaveLength(0);

    expect(getAllLogs).toHaveBeenCalledTimes(1);
  });

  it('timeエラー', async () => {
    render(
      <TotalTimeProvider>
        <App />
      </TotalTimeProvider>
    );

    await user.type(screen.getByLabelText('学習内容'), 'test1');
    await user.click(screen.getByText('登録'));

    await waitFor(() => {
      const error = screen.getByText('入力されていない項目があります');
      expect(error).toBeInTheDocument();
    });

    const logs = screen.queryAllByTestId('log');
    expect(logs).toHaveLength(0);

    expect(getAllLogs).toHaveBeenCalledTimes(1);
  });
});
