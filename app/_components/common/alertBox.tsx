import React from 'react';

function AlertBox() {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">An error has occurred</strong>
    </div>
  );
}

export default AlertBox;
