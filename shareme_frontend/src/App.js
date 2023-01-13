import React from 'react';
import {Routes, Route} from 'react-router-dom'
import {Login} from './componenets';
import Home from './containers/Home';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='*' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
