import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomePage from './pages/home/index.jsx'
import EmployeePage from './pages/employee/index.jsx'
import LoginPage from './pages/login/index.jsx'
import EditProfilePage from './pages/edit-profile/index.jsx'
import AddEmployeePage from './pages/add-employee/index.jsx'
import EditEmployeePage from './pages/edit-employee/index.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/add-employee" element={<AddEmployeePage />} />
          <Route path='/employee/:id' element={<EditEmployeePage />}/>
        </Route>
        <Route path='/login' element={<LoginPage />}/>
        {/* <Route path="*" element={<NotFoundPage/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
