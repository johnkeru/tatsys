// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './layout/Dashboard';
import OnlyAdmins from './middleware/OnlyAdmins';
import Login from './pages/Login';
import RoleAssign from './pages/RoleAssign';
import RolesManagement from './pages/RoleManagement';
import RolesTable from './pages/RolesTable';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path='/' element={<Dashboard />}>
        <Route index element={<h1>Home page</h1>} />
        <Route path='/settings' element={<h1>Home page</h1>} />
        <Route path='/reports' element={<h1>Home page</h1>} />

        <Route path='/role-management' element={<OnlyAdmins><RolesManagement /></OnlyAdmins>} >
          <Route index element={<RolesTable />} />
          <Route path='assign' element={<RoleAssign />} />
          <Route path='test' element={<h1>Test</h1>} />
        </Route>
      </Route>

    </Routes>
  );
};

export default App;
