import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { DarkMode } from "../../contexts/DarkModeContext";
import { DivisionService } from "../../services/divisionService";
import { EmployeeService } from "../../services/employeeService";

const EditEmployeePage = ({  }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [extistingImage, setExtistingImage] = useState('');
  const [image, setImage] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const {id} = useParams();

  const { isDarkMode } = useContext(DarkMode);

  const [errorBags,setErrorBags] = useState({
    name: [],
    phone: [],
    position: [],
    image: [],
    divisionId: [],
  });

  const addEmployee = async () => {
    try {
      const formData = new FormData();
      formData.append('name',name);
      formData.append('phone',phone);
      formData.append('position',position);
      formData.append('division_id',divisionId);

      formData.append('image',image);

      await EmployeeService.update(formData, id);

      Swal.fire({
          icon: "success",
          title: "Ubah Karyawan Berhasil",
          text: "Berhasil memperbarui karyawan!",
          customClass: {
            popup: isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black',
            button: 'bg-blue-500 text-white hover:bg-blue-700',
          },
      });
    } catch (e) {
      Swal.fire({
          icon: "error",
          title: "Ubah Karyawan Gagal",
          text: "Gagal memperbarui karyawan!",
          customClass: {
            popup: isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black',
            button: 'bg-blue-500 text-white hover:bg-blue-700',
          },
      });
    }
  }

  const fetchingDivisions = async () => {
    const records = await DivisionService.all();
    setDivisions(records);
    const employee = await EmployeeService.show(id);
    setName(employee.name);
    setPhone(employee.phone);
    setPosition(employee.position);
    setExtistingImage(employee.image);
    setDivisionId(employee.division.id);
  }

  useEffect(() => {
    fetchingDivisions();
  },[]);

  useEffect(() => {
    const newErrorBags = {
      name: [],
      phone: [],
      position: [],
      image: [],
      divisionId: [],
    };

    if (name.length == 0) {
      newErrorBags.name.push('Nama lengkap harus diisi.');
    }

    if (phone.length == 0) {
      newErrorBags.phone.push('Nomor telepon harus diisi.');
    } else if (isNaN(phone)) {
      newErrorBags.phone.push('Nomor telepon harus berupa angka.');
    } else if (phone.length < 5) {
      newErrorBags.phone.push('Nomor telepon harus berjumlah minimal 5 digit.');
    }
    if (position.length == 0) {
      newErrorBags.position.push('Posisi harus diisi.');
    }
    if (divisionId.length == 0) {
      newErrorBags.divisionId.push('Divisi harus diisi.');
    }

    setErrorBags(newErrorBags);
  },[name, phone, divisionId, position, image]);
  
  return (
    <Layout>
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
            Ubah Karyawan
          </h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Dapat memperbarui karyawan disini.
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
              <label htmlFor="phone" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Nomor Telepon
              </label>
            </div>
    
            <div className="sm:col-span-9">
              <input value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" type="text" className="py-2 px-3 block border w-full border-gray-300 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Masukkan nomor telepon"/>
              {errorBags.phone.length > 0 && (
                <p className="text-xs text-red-600 mt-2" id="phone-error">{errorBags.phone[0]}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="position" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Posisi
              </label>
            </div>
    
            <div className="sm:col-span-9">
              <input value={position} onChange={(e) => setPosition(e.target.value)} id="position" type="text" className="py-2 px-3 block border w-full border-gray-300 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Masukkan posisi"/>
              {errorBags.position.length > 0 && (
                <p className="text-xs text-red-600 mt-2" id="position-error">{errorBags.position[0]}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="division" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Divisi
              </label>
            </div>
    
            <div className="sm:col-span-9">
              <select id="division" value={divisionId} onChange={(e) => setDivisionId(e.target.value)} className="py-3 px-4 pe-9 border-gray-300 border block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                <option value="">Pilih divisi</option>
                {divisions.map((division, i) => (
                  <option key={i} value={division.id}>{division.name}</option>
                ))}
              </select>
              {errorBags.divisionId.length > 0 && (
                <p className="text-xs text-red-600 mt-2" id="division-error">{errorBags.divisionId[0]}</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="image" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                Gambar
              </label>
            </div>
    
            <div className="sm:col-span-9">
            <div className="max-w-sm">
              <label htmlFor="image" className="sr-only">Pilih file</label>
              <div className="flex gap-2 items-center">
                <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="image" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                  file:bg-gray-50 file:border-0
                  file:me-4
                  file:py-3 file:px-4
                  dark:file:bg-neutral-700 dark:file:text-neutral-400"/>
                  {!image && (
                    <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/${extistingImage}`} alt="" className="h-10" />
                  )}
              </div>
            </div>
              {errorBags.image.length > 0 && (
                <p className="text-xs text-red-600 mt-2" id="image-error">{errorBags.image[0]}</p>
              )}
            </div>
          </div>
    
          <div className="mt-5 flex justify-end gap-x-2">
            <Link to={'/employee'} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
              Kembali
            </Link>
            <button onClick={addEmployee} disabled={(errorBags.name.length > 0 || errorBags.phone.length > 0 || errorBags.position.length > 0 || errorBags.divisionId.length > 0 || errorBags.image.length > 0)} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
export default EditEmployeePage;