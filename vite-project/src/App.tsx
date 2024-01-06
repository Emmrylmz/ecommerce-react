import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import { ShoppingCartProvider } from './context/shoppingCartContext.tsx';
import { DataContextProvider, } from './context/FetchData.tsx';
import Profile from './pages/Profile.tsx';
import { SidebarContextProvider} from './context/sidebarContext.tsx';
import SingleItemView from './components/SingleItemView.tsx';

function App() {
  

  return (
  <DataContextProvider>
  <ShoppingCartProvider>
  <SidebarContextProvider>
      <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:id" element={<SingleItemView />} />

          </Routes>
        </div>
  </SidebarContextProvider>
  </ShoppingCartProvider>
  </DataContextProvider>
  )
}

export default App
