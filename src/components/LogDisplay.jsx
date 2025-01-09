import { Suspense } from 'react';
import { Loading } from './Loading';
import { LogContent } from './LogContent';

export const LogDisplay = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LogContent />
    </Suspense>
  );
};
