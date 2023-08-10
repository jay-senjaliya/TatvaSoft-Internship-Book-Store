import { useState } from 'react';
import './App.css';
import List from './component/List';
import LoginForm from './component/LoginForm';
import Title from './component/Title';
import About from './pages/About';
import Home from './pages/Home';
function App() {
  const [state, setState] = useState({ home: 0, about: 0 });
  const handleRoute = (a) => {
    if (a === 'home') {
      setState({ home: 1, about: 0 })
    }
    if (a === 'about') {
      setState({ home: 0, about: 1 })
    }
  }
  return (
    <div className="App">
      {/* <button onClick={() => { handleRoute('home') }}>Home</button>
      <button onClick={() => { handleRoute('about') }}>About</button>
      {state.home === 1 ? <Home /> : <About />} */}
      {/* <List /> */}
      {/* <LoginForm /> */}
    </div>
  );
}

export default App;
