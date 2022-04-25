
import React from 'react'
import Signup from './Signup'
import Login from './Login'
import { AuthProvider } from '../contexts/AuthContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from "./Dashboard"
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword'
import Profile from './Profile';
import TodoPage from './TodoPage';
import Timer from './Timer'
import Notes from './Notes'
function App() {
  return (
   
      
      <div >
        <Router>
        <AuthProvider>
          <Routes>
          <Route path="/"

                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              ></Route>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/Forgot-password" element={<ForgotPassword/>}/>
          <Route path="/TodoPage" element={<TodoPage/>}/>
          <Route path="/Notes" element={<Notes/>}/>
          <Route path="/Timer" element={<Timer/>}/>
          </Routes>
        </AuthProvider>
          </Router>
      </div>
     
   
  )
}

export default App;
