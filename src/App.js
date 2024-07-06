import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import BookList from './components/BookList/BookList';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <div>
      <Header/>
      <div className="App">
        {/* Routes are defined inside the Switch component */}
        <Routes>
          <Route exact path="/" element={<BookList/>} />
          <Route path="/cart" element={<ShoppingCart/>} />
          {/* This route will catch all other paths */}
          <Route component={NotFound} />
        </Routes>
      </div>
    </div>
  );
}


export default App;
