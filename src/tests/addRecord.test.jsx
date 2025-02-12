import '@testing-library/jest-dom';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import App from '../App';
import { TotalTimeProvider } from '../Providers/TotalTimeProvider';
import JSDOMEnvironment from 'jest-environment-jsdom';

jest.setTimeout(10000);

describe('動作テスト', () => {
  it('記録追加', async () => {
    render(<App />);

    await waitFor(
      () => {
        expect(screen.getByTestId('log')).toBeDefined();
      },
      { timeout: 5000 }
    );

    const initialRecords = screen.getByTestId('log').children;
    const initialCount = initialRecords.length;

    fireEvent.change(screen.getByLabelText('学習内容'), {
      target: { value: 'test' },
    });
    fireEvent.change(screen.getByLabelText('学習時間'), {
      target: { value: '30' },
    });
    fireEvent.click(screen.getByText('登録'));

    await waitFor(
      () => {
        const updatedRecords = screen.getAllByText(/時間/);
        expect(updatedRecords.length).toBe(initialCount + 1);
      },
      { timeout: 5000 }
    );

    expect(screen.getByText('test 30時間')).toBeInTheDocument();
  });
});
