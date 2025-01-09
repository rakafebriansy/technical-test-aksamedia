import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/index.jsx'
import LoginPage from './pages/login/index.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
        {/* <Route path='/admin/note-details/:idParams' element={<AdminNoteDetailsPage />}/>
        <Route path="*" element={<NotFoundPage/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
