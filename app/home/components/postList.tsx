'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PostLike } from '@/app/types/Post';
import dateFormat from '@/app/hook/dateFormat';

function TableList({ item } : { item: PostLike }) {
  const router = useRouter();

  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
        onClick={() => router.push(`/posts/view/${item.id}`)}
      >
        {item.title}
      </th>
      <td className="px-6 py-4">
        {item.email}
      </td>
      <td className="px-6 py-4">
        {dateFormat(item.createdAt)}
      </td>
      <td className="px-6 py-4">
        {String(item.likes)}
      </td>
    </tr>
  );
}

function PostList({ post }: { post: PostLike[] }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Like
            </th>
          </tr>
        </thead>
        <tbody>
          {post.map((item: PostLike) => <TableList key={item.id} item={item} />)}
        </tbody>
      </table>
    </div>

  );
}
export default PostList;
