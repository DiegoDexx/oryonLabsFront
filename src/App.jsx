import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import NavBar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import FAQWebConsultora from './pages/faq';
import AdminPanel from './pages/adminPanel';
import Login from './pages/login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/faq" element={<FAQWebConsultora />} />

          {/* Rutas protegidas */}
          <Route
            path="/adminpanel"
            element={
              <PrivateRoute roles={['admin', 'Administrador']}>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login onClose={() => {}} />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
