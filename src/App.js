import './App.css';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import Budgets from './pages/Budgets';
import Expenses from './pages/Expenses';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { authApi } from './apiSlice';

function App() {
  return (
    <ApiProvider api={authApi}>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/budgets' element={<Budgets />} />
            <Route path='/expenses' element={<Expenses />} />
          </Routes>
        </Router>
      </div>
    </ApiProvider>
  );
}

export default App;
