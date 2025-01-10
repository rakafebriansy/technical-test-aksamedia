import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyFullName, myPassword, setMyFullName } from "../../helper/credentials";

const EditProfile = ({  }) => {

  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  const [errorBags,setErrorBags] = useState({
      fullName: [],
      password: [],
  });

  const changeFullName = () => {
    if(password === myPassword) {
      setMyFullName(fullName);
      Swal.fire({
          icon: "success",
          title: "Ubah Profil Berhasil",
          text: "Nama lengkap anda berhasil diperbarui!",
      });
      setFullName('');
      setPassword('');
    } else {
      Swal.fire({
          icon: "error",
          title: "Ubah Profil Gagal",
          text: "Kata sandi salah!",
      });
    }
  }

  useEffect(() => {
    const fullName = getMyFullName();
    if(fullName) {
      setFullName(fullName);
    }
  },[]);

  useEffect(() => {
    const newErrorBags = {
      fullName: [],
      password: [],
    };

    if (fullName.length == 0) {
        newErrorBags.fullName.push('Nama lengkap harus diisi.');
    }

    if (password.length == 0) {
        newErrorBags.password.push('Kata sandi harus diisi.');
    }

    setErrorBags(newErrorBags);
  },[fullName, password]);

  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
            Ubah Profil
          </h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Atur nama lengkapmu disini.
          </p>
        </div>
    
        <div>
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label htmlFor="fullName" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Nama Lengkap
              </label>
            </div>
    
            <div className="sm:col-span-9">
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} id="fullName" type="text" className="py-2 px-3 pe-11 block border w-full border-gray-300 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Masukkan nama lengkap"/>
              {errorBags.fullName.length > 0 && (
                <p className="text-xs text-red-600 mt-2" id="password-error">{errorBags.fullName[0]}</p>
              )}
            </div>
    
            <div className="sm:col-span-3">
              <label htmlFor="password" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Kata Sandi
              </label>
            </div>
    
            <div className="sm:col-span-9">
              <div className="space-y-2">
                <div className="relative">
                  <input value={password} type={isHidden ? 'password' : 'text'} onChange={(e) => setPassword(e.target.value)} id="password" className="py-2 px-3 pe-11 block w-full border-gray-300 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Masukkan kata sandi"/>
                  {isHidden ? (
                    <div className="absolute top-1/2 -translate-y-1/2 right-3">
                        <svg onClick={() => setIsHidden(!isHidden)} className="w-5 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                  ) : (
                    <div className="absolute top-1/2 -translate-y-1/2 right-3">
                        <svg onClick={() => setIsHidden(!isHidden)} className="w-5 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                  )}
                </div>
                  {errorBags.password.length > 0 && (
                    <p className="text-xs text-red-600 mt-2" id="password-error">{errorBags.password[0]}</p>
                  )}
              </div>
            </div>
          </div>
    
          <div className="mt-5 flex justify-end gap-x-2">
            <Link to={'/'} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
              Kembali
            </Link>
            <button onClick={changeFullName} disabled={(errorBags.password.length > 0 || errorBags.fullName.length > 0)} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditProfile;