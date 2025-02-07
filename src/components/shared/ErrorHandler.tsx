import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface ErrorHandlerProps {
  error: Error;
  resetError: () => void;
}

export const ErrorHandler: React.FC<ErrorHandlerProps> = ({ error, resetError }) => {
  const queryClient = useQueryClient();

  const handleRetry = async () => {
    await queryClient.invalidateQueries();
    resetError();
  };

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {error.name === 'APIError' ? 'API Error' : 'Application Error'}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error.message}</p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-md bg-red-100 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};