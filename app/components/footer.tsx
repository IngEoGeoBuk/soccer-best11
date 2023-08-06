import React from 'react';

function Footer() {
  return (
    <footer className="bg-white shadow dark:bg-gray-800 py-5">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023
          {' '}
          <a href="https://flowbite.com/" className="hover:underline">you3667@gmail.com</a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <button type="button" className="mr-4 hover:underline md:mr-6 ">About</button>
          </li>
          <li>
            <button type="button" className="mr-4 hover:underline md:mr-6">Privacy Policy</button>
          </li>
          <li>
            <button type="button" className="mr-4 hover:underline md:mr-6">Licensing</button>
          </li>
          <li>
            <button type="button" className="hover:underline">Contact</button>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
