import React from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom';
import { RegisterLogin, UserPage, Profile, Edit } from './pages/pages'
import { UserContextProvider } from './UserContext';
import Taskform from './components/taskform/Taskform';
import Navbar from './components/navbar/Navbar';

const App = () => {
  axios.defaults.baseURL = 'http://localhost:4001';
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<RegisterLogin />} />
        <Route exact path='/userpage' element={<UserPage />} />
        <Route exact path='/taskform' element={<Taskform />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/edit/:id' element={<Edit />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App