import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserService } from "../../services/userService";
import Layout from "../../components/Layout";
import { DarkMode } from "../../contexts/DarkModeContext";

const EditUserPage = ({  }) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useContext(DarkMode);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const [errorBags,setErrorBags] = useState({
      name: [],
      age: [],
      address: [],
  });

  const update = () => {
    const formData = {
        id: id,
        name, 
        age, 
        address
    };

    const updated = UserService.updateUser(formData);

    if (updated) {
      setName('');
      setAge('');
      setAddress('');
      Swal.fire({
        icon: "success",
        title: "Ubah User Berhasil",
        text: "Berhasil memperbarui user!",
        customClass: {
          popup: isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black',
          button: 'bg-blue-500 text-white hover:bg-blue-700',
        },
      });
      navigate('/');
    } else {
      Swal.fire({
        icon: "error",
        title: "Ubah User Gagal",
        text: "Gagal memperbarui user!",
        customClass: {
          popup: isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black',
          button: 'bg-blue-500 text-white hover:bg-blue-700',
        },
      });
    }
  }

  useEffect(() => {
    const user = UserService.getUserById(id);
    if(user) {
      setName(user.name);
      setAge(user.age);
      setAddress(user.address);
    } else {
      navigate('/');
    }
  },[]);

  useEffect(() => {
    const newErrorBags = {
        name: [],
        age: [],
        address: [],
    };

    if (name.length == 0) {
        newErrorBags.name.push('Nama lengkap harus diisi.');
    }

    if (!age) {
        newErrorBags.age.push('Umur lengkap harus diisi.');
    } else if (age === '0') {
        newErrorBags.age.push('Umur tidak boleh nol.');
    }

    if (address.length == 0) {
        newErrorBags.address.push('Alamat lengkap harus diisi.');
    }

    setErrorBags(newErrorBags);
  },[name, age, address]);

  return (
    <Layout>
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
            Ubah User
          </h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Dapat memperbarui data user disini.
          </p>
        </div>
    
        <div>
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Nama
              </label>
            </div>
    
            <div className="sm:col-span-9">
              <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" className="py-2 px-3 block border w-full border-gray-300 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Masukkan nama lengkap"/>
              {errorBags.name.length > 0 && (
                <p className="text-xs text-red-600 mt-2" id="nama-error">{errorBags.name[0]}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="age" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Umur
              </label>
            </div>
    
            <div className="sm:col-span-9">
              <input value={age} onChange={(e) => setAge(e.target.value)} id="age" type="number" className="py-2 px-3 block border w-full border-gray-300 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Masukkan umur"/>
              {errorBags.age.length > 0 && (
                <p className="text-xs text-red-600 mt-2" id="age-error">{errorBags.age[0]}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="address" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Alamat
              </label>
            </div>
    
            <div className="sm:col-span-9">
              <input value={address} onChange={(e) => setAddress(e.target.value)} id="address" type="text" className="py-2 px-3 block border w-full border-gray-300 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Masukkan alamat"/>
              {errorBags.address.length > 0 && (
                <p className="text-xs text-red-600 mt-2" id="address-error">{errorBags.address[0]}</p>
              )}
            </div>
          </div>
    
          <div className="mt-5 flex justify-end gap-x-2">
            <Link to={'/'} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
              Kembali
            </Link>
            <button onClick={update} disabled={(errorBags.name.length > 0 || errorBags.age.length > 0 || errorBags.address.length > 0)} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
export default EditUserPage;