import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomePage from './pages/home/index.jsx'
import EmployeePage from './pages/employee/index.jsx'
import LoginPage from './pages/login/index.jsx'
import EditProfilePage from './pages/edit-profile/index.jsx'
import AddUserPage from './pages/add-user/index.jsx'
import EditUserPage from './pages/edit-user/index.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/add-user" element={<AddUserPage />} />
          <Route path='/user/:id' element={<EditUserPage />}/>
        </Route>
        <Route path='/login' element={<LoginPage />}/>
        {/* <Route path="*" element={<NotFoundPage/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
