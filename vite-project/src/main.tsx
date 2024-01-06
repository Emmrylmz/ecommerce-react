import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.tsx';
import { SidebarContextProvider } from './context/sidebarContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SidebarContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </SidebarContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
