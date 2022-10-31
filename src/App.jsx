
import './App.css';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { axiosInstance } from './api';
import { login, logout } from './redux/features/authSlice';
import Navbar from './component/Navbar';
import GuestRoute from './component/GuestRoute';
import Home from './pages/Home';
import CartPage from './pages/Cart';
import ProtectedRoute from './component/ProtectedRoute';
import TransactionPage from './pages/TransactionList';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NavbarAdmin from './component/NavbarAdmin';
import AdminTransactionList from './pages/AdminTransactionList';
import AdminCategory from './pages/AdminCategory';
import TestUjian1 from './pages/testUjian1';
import TestUjian2 from './pages/testUjian2';



function App() {
  const authSelector = useSelector((state) => state.auth)

  const cartSelector = useSelector((state) => state.cart)

  const [authCheck, setAuthCheck] = useState(false)

  const dispatch = useDispatch()

  const toast = useToast()

  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token")

      if (!auth_token) {
        setAuthCheck(true)
        return
      }

      const response = await axiosInstance.get("/auth/refresh-token")
      dispatch(login(response.data.data))
      localStorage.setItem("auth_token", response.data.token)
      setAuthCheck(true)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    } finally {
      setAuthCheck(true)
    }
  }
  // const navigate = useNavigate()

  // const logoutBtnHandler = () => {
  //   localStorage.removeItem("auth_token");
  //   dispatch(logout());
  //   toast({
  //     title: "User Logout",
  //     status: "info",
  //   });
  //   navigate("/login");
  // };

  useEffect(() => {
    keepUserLoggedIn()
  }, [])

  return (
    <>
      {authSelector.is_admin ? (
        <Box>
          <NavbarAdmin />
        </Box>
      ) : (
        <Box>
          <Navbar />
        </Box>
      )}

      <Routes>
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element=
          {
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/carts"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            // <ProtectedRoute>
            <TransactionPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/adminLogin"
          element={
            // <ProtectedRoute>
            <AdminLogin />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            // <ProtectedRoute>
            <AdminDashboard />
            // </ProtectedRoute>
          }
        />


        <Route path="/test1" element={<TestUjian1 />} />

        <Route path="/test2" element={<TestUjian2 />} />

        <Route path="/admin/transaction" element={<AdminTransactionList />} />
        <Route path="/admin/category" element={<AdminCategory />} />
        <Route path="/admin/login" element={<AdminLogin />} />


      </Routes>






    </>
  );
}

export default App;
