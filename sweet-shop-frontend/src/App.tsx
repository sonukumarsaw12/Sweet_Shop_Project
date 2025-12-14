import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import AdminLogin from "./pages/AdminLogin";
import Register from "./auth/Register";
import SweetList from "./sweets/SweetList";
import Header from "./components/Header";
import AdminDashboard from "./pages/AdminDashboard";
import { useState } from "react";


import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";


export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <>
      <Header onSearch={setSearchQuery} />
      <div className="pt-4">{children}</div>
    </>
  );

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Layout><CartPage /></Layout>} />
          <Route path="/orders" element={<Layout><OrdersPage /></Layout>} />


          <Route
            path="/"
            element={
              <Layout>
                <SweetList searchTerm={searchQuery} onClearSearch={setSearchQuery} />
              </Layout>
            }
          />

          <Route
            path="/admin"
            element={
              <Layout>
                <AdminDashboard />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
