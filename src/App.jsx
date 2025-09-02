

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home.jsx'
import NavBar from './components/navbar';
// import Footer from './components/Footer'
import { Provider } from 'react-redux'
import FAQWebConsultora from './pages/faq.jsx';
import store from './store' // Importa tu store de Redux
import Footer from './components/footer.jsx';
import AdminPanel from './pages/adminPanel.jsx';
import Login from './pages/login.jsx';  

function App() {
    const [showLoginModal, setShowLoginModal] = React.useState(false);
    //siempre redirecciona a /home al iniciar la app

  return (
    <Provider store={store}>
      <Router>
        <NavBar showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
        <Routes>
             <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/faq" element={<FAQWebConsultora />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}



export default App;



