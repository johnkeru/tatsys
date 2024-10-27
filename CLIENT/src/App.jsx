import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './layout/Dashboard';
import OnlyAdmins from './middleware/OnlyAdmins';
import OnlySuperAdmins from './middleware/OnlySuperAdmins';
import Login from './pages/Login';
import RoleAssign from './pages/RoleAssign';
import RolesManagement from './pages/RoleManagement';
import RolesTable from './pages/RolesTable';
import UserProvider from './context/UserContext';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path='/' element={<UserProvider><Dashboard /></UserProvider>}>
        <Route path='/dashboard' element={<h1>Home page</h1>} />
        <Route path='/settings' element={<h1>Home page</h1>} />
        <Route path='/reports' element={<h1>Home page</h1>} />

        <Route path='role-management' element={<OnlyAdmins><RolesManagement /></OnlyAdmins>} >
          <Route index element={<OnlySuperAdmins><RolesTable /></OnlySuperAdmins>} />
          <Route path='assign' element={<RoleAssign />} />
        </Route>

      </Route>

    </Routes>
  );
};

export default App;
