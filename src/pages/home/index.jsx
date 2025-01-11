import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { DivisionService } from "../../services/divisionService";

const HomePage = ({  }) => {

    const navigate = useNavigate();
    const [divisions, setDivisions] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const fetchingDivisions = async (name, page = 1) => {
        const records = await DivisionService.get({name: name, page: page, perPage: perPage});
        setDivisions(records.divisions);
        setKeyword(name);
        setCurrentPage(parseInt(page));
        setTotalPages(Math.ceil(records.pagination.total/records.pagination.per_page));
        updateSearchParams(page);
    }
    
    useEffect(() => {
        const init = async () => {
            const searchParams = new URLSearchParams(location.search);
            const keywordParam = searchParams.get('keyword');
            const pageParam = searchParams.get('page');
            
            if (keywordParam) {
                fetchingDivisions(keywordParam, pageParam);
            } else {
                fetchingDivisions('',pageParam ?? 1);
            }
        }
        init();
    },[]);

    const updateSearchParams = (page = undefined) => {
        const searchParams = new URLSearchParams(location.search);

        searchParams.set('keyword',keyword);
        if(page) {
            searchParams.set('page',page);
        } else if (currentPage) {
            searchParams.set('page',currentPage);
        }

        navigate({
            pathname: location.pathname,
            search: searchParams.toString(),
        });
    }

    const search = () => {
        fetchingDivisions(keyword,1)
    }

    const nextPage = async () => {
        if (currentPage < totalPages) {
            const page = currentPage + 1;
            await fetchingDivisions(keyword, page);
        }
    };

    const prevPage = async () => {
        if (currentPage > 1) {
            const page = currentPage - 1;
            await fetchingDivisions(keyword, page);
        }
    };

    return (
        <Layout>
            <div className="mt-8 justify-center flex">
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto md:w-fit w-[20rem]">
                        <div className="mb-3">
                            <h1 className="font-semibold dark:text-neutral-200">Tabel Divisi</h1>
                        </div>
                        <div className="inline-block align-middle">
                            <div className="border rounded-lg overflow-hidden dark:border-neutral-700 dark:bg-neutral-800">
                                <div className="w-full flex flex-col md:flex-row gap-2 md:justify-between items-start md:items-center p-5">
                                    <div className="max-w-sm relative">
                                        <svg className="w-4 absolute left-3 top-1/2 stroke-gray-400 -translate-y-1/2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text" className="py-2 ps-9 pe-16 block w-full border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 border" placeholder="Cari berdasarkan nama"/>
                                        <button onClick={search} className="py-1 px-3 inline-flex items-center gap-x-2 text-xs absolute top-1/2 -translate-y-1/2 right-3 font-medium rounded-lg border dark:hover:bg-gray-800 dark:bg-gray-700 border-transparent bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none">Cari</button>
                                    </div>
                                </div>
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 ">
                                    <thead>
                                        <tr>
                                        <th scope="col" className="pe-2 ps-4 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">No</th>
                                        <th scope="col" className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Nama</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                        {divisions.length > 0 ? (
                                            divisions.map((division,i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className="pe-2 ps-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{(currentPage - 1) * 5 + i + 1}</td>
                                                        <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{division.name}</td>
                                                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{division.age}</td>
                                                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{division.address}</td>
                                                        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{division.address}</td>
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
                                {divisions.length > 0 && (
                                <div className="flex justify-between items-center p-5 gap-5">
                                    <button onClick={prevPage} disabled={currentPage === 1} className="py-2 px-4 text-sm font-medium rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50">Sebelumnya</button>
                                    <span className="text-sm font-medium text-gray-700 dark:text-neutral-300">Halaman {currentPage} dari {totalPages}</span>
                                    <button onClick={nextPage} disabled={currentPage === totalPages} className="py-2 px-4 text-sm font-medium rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50">Selanjutnya</button>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default HomePage;