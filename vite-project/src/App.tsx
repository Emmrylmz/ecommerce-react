import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import { ShoppingCartProvider } from './context/shoppingCartContext.tsx';
import { DataContextProvider, } from './context/FetchData.tsx';
function App() {
  

  return (
    <DataContextProvider>
  <ShoppingCartProvider>
      <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          </Routes>
        </div>
  </ShoppingCartProvider>
  </DataContextProvider>
  )
}

export default App
