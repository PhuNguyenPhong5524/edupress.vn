import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminLayout from './layouts/AdminLayout.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import HomePage from './pages/customer/Home/HomePage.jsx'
import CustomerLayout from './layouts/CustomerLayout.jsx'
import Detail from './pages/customer/Detail/DetailPage.jsx'
import ManagementUsers from './pages/admin/ManagementUsers/ManagementUsers.jsx'
import Register from './pages/Register/Register.jsx'
import "./i18n.js"
import AuthProvider from './context/AuthContext.jsx'
import CartPage from './pages/customer/Cart/CartPage.jsx'
import CheckoutPage from './pages/customer/Checkout/CheckoutPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter> 
        <Routes>
          <Route path='/' element={<CustomerLayout />} >
            <Route index element={<HomePage />} />
            <Route path='detail/:_id' element={<Detail />} />
            <Route path='cart' element={<CartPage /> } />
            <Route path='checkout' element={<CheckoutPage />} />
          </Route>
          <Route path='/admin'  element={<AdminLayout />} >
            <Route path='employee' element={<ManagementUsers />} />
            <Route path='products' element={<div>Products</div>} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
