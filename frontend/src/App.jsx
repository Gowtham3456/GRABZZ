//import React from 'react'

import { BrowserRouter,Routes,Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout"
import Home from "./pages/Home";
import {Toaster} from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";

export const App = () => {
  return (
   <BrowserRouter>
    <Toaster position="top-right"></Toaster>
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="register" element={<Register/>}></Route>
        <Route path="profile" element={<Profile/>}></Route>
        <Route path="collections/:collection" element={<CollectionPage/>}></Route>
        <Route path="product/:id" element={<ProductDetails/>}></Route>
        <Route path="checkout" element={<Checkout/>}></Route>
        <Route path="order-confirmation" element={<OrderConfirmationPage/>}></Route>
        <Route path="order/:id" element={<OrderDetailsPage/>}></Route>
        <Route path="my-orders" element={<MyOrdersPage/>}></Route>

      </Route>
       {/*admin layout*/}
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminHomePage/>}></Route>
        <Route path="users" element={<UserManagement/>}></Route>
        <Route path="products" element={<ProductManagement/>}></Route>
        <Route path="products/:id/edit" element={<EditProductPage/>}></Route>
      </Route>
    </Routes>
   </BrowserRouter>
  );
};
export default App;

















// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
