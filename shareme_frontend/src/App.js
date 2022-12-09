import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Login from './componenets/Login';
import Home from './containers/Home';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
