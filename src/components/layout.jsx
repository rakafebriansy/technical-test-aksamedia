import { Link, useLocation, useNavigate } from "react-router-dom"
import { getCookie, removeCookie } from "../helper/cookie";
import { useContext, useEffect, useRef, useState } from "react";
import { DarkMode } from "../contexts/DarkModeContext";

const Layout = ({ children }) => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const toggleRef = useRef(null);
    const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
          localStorage.setItem('theme', 'light');
          document.documentElement.classList.remove('dark');
        } else {
          localStorage.setItem('theme', 'dark');
          document.documentElement.classList.add('dark');
        }
    }
    
    const logout = () => {
        removeCookie('authorized');
        navigate('/login');
    }

    useEffect(() => {
        setUsername(getCookie('authorized'));
        setFullName(getCookie('fullName'));

        if (localStorage.getItem('theme') === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    },[]);

    return (
        <main className="relative">
            {username && (
                <nav className="flex fixed border-b shadow-sm py-3 px-10 md:px-20 w-full justify-between z-50">
                <ul className="flex gap-4">
                    <Link to={'/'} className={`${location.pathname == '/' ? 'font-semibold' : ''} inline-flex items-center gap-x-2 text-sm whitespace-nowrap text-blue-600 hover:text-blue-70 focus:outline-none focus:text-blue-700 dark:text-blue-500 dark:focus:text-blue-400`} href="#">
                        Beranda
                    </Link>
                    <a className="inline-flex items-center gap-x-2 text-sm whitespace-nowrap text-blue-600 hover:text-blue-70 focus:outline-none focus:text-blue-700 opacity-50 pointer-events-none dark:text-blue-500 dark:focus:text-blue-400" href="#">
                        Lainnya
                    </a>
                </ul>
                <div className="flex gap-3 items-center">
                    <div className="flex flex-col justify-start text-xs dark:text-neutral-200">
                            <p className="font-bold">{username}</p>
                            <p>Nama: {fullName}</p>
                    </div>
                    <div className="relative inline-flex flex-col">
                        <button onClick={() => setVisible(!visible)} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                            Menu
                            <svg className={`size-4 ${visible ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </button>
                        
                        <div className="flex gap-3">
                            <div className={`absolute top-full w-32 -translatey-1/2 ${visible ? "opacity-100 mt-4 duration transition-[opacity,margin]" : "opacity-0 mt-0 hidden"}
                                bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full`} role="menu" aria-orientation="vertical">
                                <div className="p-1 space-y-0.5">
                                    <Link to={'/edit-profile'} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="#">
                                        Profil
                                    </Link>
                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="#">
                                        <span>{isDarkMode ? 'Gelap' : 'Terang'}</span>
                                        <div className="flex">
                                            <input type="checkbox" checked={isDarkMode} onChange={toggleMode} className="hidden" id="dark-toggle"/>
                                            <label htmlFor="dark-toggle">
                                                <div
                                                    ref={toggleRef}
                                                    className="toggle-bg flex h-5 w-9 cursor-pointer items-center rounded-full bg-neutral-700 p-1 transition duration-300 ease-in-out">
                                                    <div
                                                        className="toggle-round bg-white h-4 w-4 rounded-full bg-secondary transition duration-300 ease-in-out">
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </a>
                                    <button onClick={logout} className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="#">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            )}
        <div className={`${username ? 'md:px-10 pt-16 md:pt-20' : ''}`}>{children}</div>
        </main>
    );
}

export default Layout;