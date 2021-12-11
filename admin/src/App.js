import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import { Home } from "./pages/Home";
import { User } from "./pages/User/User";
import { UsersList } from "./pages/User/UsersList";
import { NewUser } from "./pages/User/NewUser";
import { Product } from "./pages/Product/Product";
import { ProductsList } from "./pages/Product/ProductsList";
import { NewProduct } from "./pages/Product/NewProduct";
import { Login } from "./pages/Login";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`

function App() {
  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin : false
  console.log(admin)
  const PrivateRoute = ({ children, admin }) => {
    if (admin) {
      return children
    }
    return <Navigate to="/login" />
  }
  return (
    <Router>
      <Routes>
        <Route path='/*'
          element={
            <PrivateRoute admin={admin}>
              <Topbar />
              <Container >
                <Sidebar />
                <Routes>
                  <Route path='/' element={admin ? <Home /> : <Navigate to='/login' />} />
                  <Route path='/users' element={admin ? <UsersList /> : <Navigate to='/login' />} />
                  <Route path='/user/:id' element={<User />} />
                  <Route path='/newUser' element={<NewUser />} />
                  <Route path='/products' element={<ProductsList />} />
                  <Route path='/product/:id' element={<Product />} />
                  <Route path='/newProduct' element={<NewProduct />} />
                  <Route path='/login' element={<Login />} />
                </Routes >
              </Container>
            </PrivateRoute>} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router >
  );
}

export default App;
