import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {Home, SchoolsView, School} from './pages';
import { SchoolsContextProvider } from './context/SchoolsContext';


const App = () => {
    return (
      <SchoolsContextProvider>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/schools' element={<SchoolsView/>}></Route>
            <Route path='/schools/:id' element={<School/>}></Route>
          </Routes>
        </div>
        </SchoolsContextProvider>
)};

export default App;