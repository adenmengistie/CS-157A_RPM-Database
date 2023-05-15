import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {Home,Signup, SchoolsView, School, Professor} from './pages';
import { SchoolsContextProvider } from './context/SchoolsContext';
import { UsersContextProvider } from './context/UsersContext';
import { ProfessorsContextProvider } from './context/ProfessorsContext';
import { ReviewsContextProvider } from './context/ReviewsContext';



const App = () => {
    return (
      <UsersContextProvider>
        <SchoolsContextProvider>
          <ProfessorsContextProvider>
            <ReviewsContextProvider>
              <div className="container">
                  <Routes>
                      <Route path='/' element={<Home/>}></Route>
                      <Route path='/signup' element={<Signup/>}></Route>
                      <Route path='/:id/schools' element={<SchoolsView/>}></Route>
                      <Route path='/:id/schools/:id1' element={<School/>}></Route>
                      <Route path='/:id/schools/:id1/professors/:id2' element={<Professor/>}></Route>
                  </Routes>
              </div>
            </ReviewsContextProvider>
          </ProfessorsContextProvider>
        </SchoolsContextProvider>
      </UsersContextProvider>
        
)};

export default App;