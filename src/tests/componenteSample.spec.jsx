import App from '../App';
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Title Test', () => {
  it('タイトルが「学習記録アプリ」であること', async () => {
    // testId(title)を指定して取得
    render(<App />);
    const title = screen.getByTestId('title');
    await expect(title).toHaveTextContent('学習記録アプリ');
  });
});
