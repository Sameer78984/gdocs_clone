'use client';

import { ErrorState } from '../components/common/ErrorState';
import { Button } from '../components/ui/button';
import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-screen items-center justify-center p-4">
      <ErrorState 
        message={error.message || "An unexpected error occurred"}
        action={
          <Button onClick={() => reset()} variant="outline">
            Try again
          </Button>
        } 
      />
    </div>
  );
}
