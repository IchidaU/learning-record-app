import '@testing-library/jest-dom';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import App from '../App';
import { TotalTimeProvider } from '../Providers/TotalTimeProvider';
import { getAllLogs } from '../utils/supabaseFunctions';

jest.mock('../utils/supabaseFunctions', () => ({
  getAllLogs: jest.fn(() => Promise.resolve([])),
  onClickAdd: jest.fn(() => Promise.resolve()),
}));

describe('動作テスト', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('titleエラー', async () => {
    render(
      <TotalTimeProvider>
        <App />
      </TotalTimeProvider>
    );

    fireEvent.change(screen.getByLabelText('学習内容'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText('学習時間'), {
      target: { value: '1' },
    });
    fireEvent.click(screen.getByText('登録'));

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

    fireEvent.change(screen.getByLabelText('学習内容'), {
      target: { value: 'test' },
    });
    fireEvent.change(screen.getByLabelText('学習時間'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByText('登録'));

    await waitFor(() => {
      const error = screen.getByText('入力されていない項目があります');
      expect(error).toBeInTheDocument();
    });

    const logs = screen.queryAllByTestId('log');
    expect(logs).toHaveLength(0);

    expect(getAllLogs).toHaveBeenCalledTimes(1);
  });
});
