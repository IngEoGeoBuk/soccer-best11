import React, { useState } from 'react';

import { useSession } from 'next-auth/react';

import { ViewReply } from '@/app/types/Reply';
import dateFormat from '@/app/utils/dateFormat';

import EditReplyBox from './editReplyBox';

interface Interface {
  reply: ViewReply;
  setShowModal: (value: number) => void;
}

function ReplyItem({ reply, setShowModal }: Interface) {
  const email = useSession().data?.user?.email;
  const [showModify, setShowModify] = useState<number>(0);

  return (
    <article className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="sm:flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            {reply.email}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time title="February 12th, 2022">
              {reply.updatedAt
                ? `${dateFormat(reply.createdAt)} (Edited)`
                : dateFormat(reply.createdAt)}
            </time>
          </p>
        </div>
        {email === reply.email && (
          <div className="flex gap-4">
            <button
              type="button"
              data-testid={`modify-reply-${reply.id}`}
              onClick={() => setShowModify(reply.id)}
            >
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                modify
              </svg>
            </button>
            <button
              type="button"
              data-testid={`delete-reply-${reply.id}`}
              onClick={() => setShowModal(reply.id)}
            >
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                />
                delete
              </svg>
            </button>
          </div>
        )}
      </footer>
      {showModify === reply.id ? (
        <EditReplyBox
          defaultValue={reply.content}
          showModify={showModify}
          setShowModify={setShowModify}
        />
      ) : (
        <p className="text-gray-500 dark:text-gray-400">{reply.content}</p>
      )}
    </article>
  );
}

export default ReplyItem;
