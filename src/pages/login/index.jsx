import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { DarkMode } from "../../contexts/DarkModeContext";
import Layout from "../../components/Layout";
import { AuthService } from "../../services/authService";
import { getAuthorizationToken } from "../../helper/utils";

const LoginPage = ({  }) => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isHidden, setIsHidden] = useState(true);
    const { isDarkMode } = useContext(DarkMode);

    const [errorBags,setErrorBags] = useState({
        username: [],
        password: []
    });

    const login = async () => {
        try {
            await AuthService.login(username, password);
            Swal.fire({
                icon: "success",
                title: "Login Berhasil",
                text: "Selamat datang!",
                customClass: {
                    popup: isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black',
                    button: 'bg-blue-500 text-white hover:bg-blue-700',
                },
            });
            navigate('/');
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login Gagal",
                text: "Username atau kata sandi salah!",
                customClass: {
                    popup: isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black',
                    button: 'bg-blue-500 text-white hover:bg-blue-700',
                },
            });
        }
    };

    useEffect(() => {
        if(getAuthorizationToken()){
            navigate('/');
        }
    },[]);

    useEffect(() => {
        const newErrorBags = {
            username: [],
            password: []
        };

        if (username.length == 0) {
            newErrorBags.username.push('Username harus diisi.');
        }

        if (password.length == 0) {
            newErrorBags.password.push('Kata sandi harus diisi.');
        }

        setErrorBags(newErrorBags);
    },[username, password]);

    return (
        <Layout>
            <div className="flex justify-center items-center w-full h-screen">
                <div className="w-[80%] md:w-[30rem] bg-white border border-gray-300 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
                    <div className="p-4 sm:p-7">
                        <div className="text-center flex-col flex justify-center items-center">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                                Silahkan isi dengan kredensial milik anda.
                            </p>
                            <p className="text-sm text-gray-600 dark:text-neutral-400">
                                username: rakaa, pw: 123456
                            </p>
                            <img src="/login-banner.webp" className="w-[30%] rounded-sm" alt="" />
                        </div>

                        <div className="mt-5">
                            <div>
                                <div className="grid gap-y-4">
                                <div>
                                    <label htmlFor="username" className="block text-sm mb-2 dark:text-white">Username</label>
                                    <div className="relative">
                                        <input type="text" onChange={(e) => setUsername(e.target.value)} id="username" name="username" className="py-3 border shadow-sm px-4 block w-full border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Masukkan username" aria-describedby="email-error"/>
                                    </div>
                                    {errorBags.username.length > 0 && (
                                        <p className="text-xs text-red-600 mt-2" id="username-error">{errorBags.username[0]}</p>
                                    )}
                                </div>
                                <div>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Kata Sandi</label>
                                    </div>
                                    <div className="relative">
                                        <input type={isHidden ? 'password' : 'text'} onChange={(e) => setPassword(e.target.value)} id="password" name="password" className="py-3 px-4 border block w-full border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Masukkan kata sandi" aria-describedby="password-error"/>
                                        {isHidden ? (
                                            <div className="absolute top-1/2 -translate-y-1/2 right-1 pe-3">
                                                <svg onClick={() => setIsHidden(!isHidden)} className="w-5 cursor-pointer stroke-black dark:stroke-neutral-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        ) : (
                                            <div className="absolute top-1/2 -translate-y-1/2 right-1 pe-3">
                                                <svg onClick={() => setIsHidden(!isHidden)} className="w-5 cursor-pointer stroke-black dark:stroke-neutral-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    {errorBags.password.length > 0 && (
                                        <p className="text-xs text-red-600 mt-2" id="password-error">{errorBags.password[0]}</p>
                                    )}
                                </div>
                                <button onClick={login} disabled={(errorBags.username.length > 0 || errorBags.password.length > 0)} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign in</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default LoginPage;