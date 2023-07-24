import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Budgets from './pages/Budgets';
import Expenses from './pages/Expenses';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Link,
  Outlet,
} from "react-router-dom";

const router = createBrowserRouter([
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/budgets' element={<Budgets />} />
      <Route path='/expenses' element={<Expenses />} />
    </Route>
  )
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <>
      <div>
        <Link to='/'>Dashboard</Link>
        <Link to='/budgets'>Budgets</Link>
        <Link to='/expenses'>Expenses</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App;
