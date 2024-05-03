import React from 'react';

export default function ToastSection({ showToast }: { showToast: string }) {
  return (
    <section>
      {showToast ? (
        <div
          id="toast-default"
          className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-500"
          role="alert"
        >
          <div className="ml-3 text-sm font-normal">{showToast}</div>
        </div>
      ) : (
        <div style={{ height: '6px' }} />
      )}
      <br />
    </section>
  );
}
