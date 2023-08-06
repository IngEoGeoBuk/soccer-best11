'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Interface {
  page: number;
  hasPrevious: boolean;
  previousPage: number;
  hasNext: boolean;
  nextPage: number;
  pageList: number[];
}

function Pagination({
  page,
  hasPrevious,
  previousPage,
  hasNext,
  nextPage,
  pageList,
}: Interface) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') ?? '';

  const movePage = (_page: number) => {
    if (type) {
      router.push(`?type=${type}&page=${_page}`);
    } else {
      router.push(`?page=${_page}`);
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="w-full flex items-center justify-center -space-x-px py-5">
        {hasPrevious && (
          <li>
            <button
              type="button"
              onClick={() => movePage(previousPage)}
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </button>
          </li>
        )}
        {pageList.map((item) => (
          <li>
            <button
              type="button"
              aria-current="page"
              onClick={() => movePage(item)}
              className={page === item
                ? 'z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                : 'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
            >
              {String(item)}
            </button>
          </li>
        ))}
        {hasNext && (
          <li>
            <button
              type="button"
              onClick={() => movePage(nextPage)}
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
