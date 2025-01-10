import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { UserService } from "../../services/userService";

const HomePage = ({  }) => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search); // Dapatkan search params dari lokasi saat ini
        const keyword = searchParams.get('keyword');
        
        if (keyword) {
            const userRecords = UserService.searchUsers(keyword);
            setKeyword(keyword);
            setUsers(userRecords);
        } else {
            const userRecords = UserService.getUsers();
            setUsers(userRecords);
        }
    },[]);

    const search = () => {
        navigate(`/?keyword=${keyword}`);
        const userRecords = UserService.searchUsers(keyword);
        setUsers(userRecords);
    }

    const remove = async (id) => {
        const attempt = await Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Anda akan menghapus user ini!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
            reverseButtons: true
        });
        if(attempt.isConfirmed) {
            UserService.removeUser(id);
            const userRecords = UserService.getUsers();
            setUsers(userRecords);
        }
    }

    return (
        <Layout>
            <div className="mt-8 w-full justify-center flex">
                <div className="flex flex-col w-[70%]">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="mb-3">
                            <h1 className="font-semibold">User Table</h1>
                        </div>
                        <div className="min-w-full inline-block align-middle">
                            <div className="border rounded-lg overflow-hidden dark:border-neutral-700">
                                <div className="w-full flex justify-between items-center p-5">
                                    <div className="max-w-sm relative">
                                        <svg className="w-4 absolute left-3 top-1/2 stroke-gray-400 -translate-y-1/2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text" className="py-2 ps-9 pe-16 block w-full border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 border" placeholder="Cari berdasarkan nama"/>
                                        <button onClick={search} className="py-1 px-3 inline-flex items-center gap-x-2 text-xs absolute top-1/2 -translate-y-1/2 right-3 font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none">Cari</button>
                                    </div>
                                    <Link to={'/add-user'} className="py-2  px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none">
                                        + Add
                                    </Link>
                                </div>
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead>
                                        <tr>
                                        <th scope="col" className="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">No</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Age</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Address</th>
                                        <th scope="col" className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                        {users.length > 0 ? (
                                            users.map((user,i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{i + 1}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{user.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{user.age}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{user.address}</td>
                                                        <td className="px-2 py-4 whitespace-nowrap text-sm font-medium">
                                                            <div className="flex gap-2">
                                                                <Link to={`/user/${user.id}`} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Edit</Link>
                                                                <button onClick={() => remove(user.id)} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Delete</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 text-center">Belum ada data.</td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default HomePage;