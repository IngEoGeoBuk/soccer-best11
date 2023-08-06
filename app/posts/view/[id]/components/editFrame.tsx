import React from 'react';

interface Interface {
  handleSubmit: (event: any) => void;
  type: string;
  value: string;
  setValue: (value: string) => void;
  cancelFunc: () => void;
}

function EditFrame({
  handleSubmit,
  type,
  value,
  setValue,
  cancelFunc,
} : Interface) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <textarea
            id={type}
            rows={4}
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"
            placeholder={`Edit a ${type}...`}
            required
            maxLength={100}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button
            type="submit"
            className="btn-primary"
          >
            {`Edit ${type}`}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => cancelFunc()}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditFrame;
