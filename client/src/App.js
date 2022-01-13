import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom"
import { Cart } from "./pages/Cart";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Orders } from "./pages/Orders";
import { Product } from "./pages/Product";
import { ProductList } from "./pages/ProductList";
import { Register } from "./pages/Register";
import { User } from "./pages/User";
import { Wishlist } from "./pages/Wishlist";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Routes>
        <Route path='/login' element={user ? <Navigate to='/' /> : < Login />} />
      </Routes>
      <Routes>
        <Route path='/register' element={user ? <Navigate to='/' /> : < Register />} />
      </Routes>
      <Routes>
        <Route path='/product/:id' element={<Product />} />
      </Routes>
      <Routes>
        <Route path='/products/:tag' element={<ProductList />} />
      </Routes>
      <Routes>
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Routes>
        <Route path='/wishlist' element={<Wishlist />} />
      </Routes>
      <Routes>
        <Route path='/profile' element={<User />} />
      </Routes>
      <Routes>
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </Router>

  );
}

export default App;
