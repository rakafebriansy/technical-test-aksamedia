import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/index.jsx'
import LoginPage from './pages/login/index.jsx'
import EditProfile from './pages/edit-profile/index.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/edit-profile' element={<EditProfile />}/>
        {/* <Route path='/admin/note-details/:idParams' element={<AdminNoteDetailsPage />}/>
        <Route path="*" element={<NotFoundPage/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
