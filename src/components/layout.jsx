import { Link, useLocation } from "react-router-dom"
import { getCookie } from "../helper/cookie";
import { useState } from "react";

const Layout = ({ children }) => {
    
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    return (
    <main className="relative">
        <nav className="flex fixed border-b shadow-sm py-6 px-20 w-full justify-between">
            <ul className="flex gap-4">
                <a className={`${location.pathname == '/' ? 'font-semibold' : ''} inline-flex items-center gap-x-2 text-sm whitespace-nowrap text-blue-600 hover:text-blue-70 focus:outline-none focus:text-blue-700 dark:text-blue-500 dark:focus:text-blue-400`} href="#">
                    Home
                </a>
                {/* <a className="inline-flex items-center gap-x-2 text-sm whitespace-nowrap text-blue-600 hover:text-blue-70 focus:outline-none focus:text-blue-700 opacity-50 pointer-events-none dark:text-blue-500 dark:focus:text-blue-400" href="#">
                    
                </a> */}
            </ul>
            <div className="">
                <div className="relative inline-flex flex-col">
                    <button onClick={() => setVisible(!visible)} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                        Menu
                        <svg className={`size-4 ${visible ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </button>

                    <div className={`transition-[opacity,margin] absolute top-full min-w-full -translatey-1/2 duration ${visible ? "opacity-100 mt-4" : "opacity-0 mt-0"}
                        bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full`} role="menu" aria-orientation="vertical">
                        <div className="p-1 space-y-0.5">
                            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="#">
                                Profile
                            </a>
                            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="#">
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
      <div>{children}</div>
    </main>
  );
}

export default Layout;