import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Name from './component/Name';
import Price from './component/Price';
import Form from './component/Form';
import { ToastContainer } from 'react-toastify';

function App() {
  const bookName = 'Rich Dad Poor Dad';
  const bookPrice = 175;
  return (
    <div id='main'>
    <Router>
      
    <Home/>
      <Routes>
        <Route path='/book-name' element={<Name name={bookName} />} />
        <Route path='/book-price' element={<Price price={bookPrice} />} />
        <Route path='/form' element={<Form />} />
      </Routes>
      <ToastContainer />
    </Router>
    </div>
  );
}

export default App;
