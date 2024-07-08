import { Route, Routes } from 'react-router-dom';
import './App.css';
import BookList from './components/BookList/BookList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Checkout from './components/Checkout/Checkout';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
function App() {

  return (
    <div>
      <Header />
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><BookList /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><ShoppingCart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </AuthProvider>
    </div>
  );
}


export default App;
