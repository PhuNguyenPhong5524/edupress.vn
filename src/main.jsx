import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminLayout from './layouts/AdminLayout.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login/Login.jsx'
import HomePage from './pages/customer/Home/HomePage.jsx'
import CustomerLayout from './layouts/CustomerLayout.jsx'
import DetailPage from './pages/customer/DetailPage/DetailPage.jsx'
import ManagementUsers from './pages/admin/ManagementUsers/ManagementUsers.jsx'
import Register from './pages/Register/Register.jsx'
import "./i18n.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<CustomerLayout />} >
          <Route index element={<HomePage />} />
          <Route path='detail/:_id' element={<DetailPage />} />
        </Route>
        <Route path='/admin'  element={<AdminLayout />} >
          <Route path='employee' element={<ManagementUsers />} />
          <Route path='products' element={<div>Products</div>} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
