import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import styled from 'styled-components'
import { Home } from "./pages/Home";
import { User } from "./pages/User";
import { UsersList } from "./pages/UsersList";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`

function App() {
  return (
    <Router>
      <Topbar />
      <Container>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Routes>
          <Route path='/users' element={<UsersList />} />
        </Routes>
        <Routes>
          <Route path='/user/:id' element={<User />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
