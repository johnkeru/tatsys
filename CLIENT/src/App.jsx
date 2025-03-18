import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProvider from "./context/UserContext";
import Dashboard from "./layout/Dashboard";
import OnlySuperAdmins from "./middleware/OnlySuperAdmins";
import Login from "./pages/Login";
import RoleAssign from "./pages/role/RoleAssign";
import RolesTable from "./pages/role/RolesTable";
import RolesAssignedTable from "./pages/role/RolesAssignedTable";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import EmployeePage from "./pages/EmployeePage";
import SupplyPage from "./pages/SupplyPage";
import InventoryPage from "./pages/InventoryPage";
import TransactionPage from "./pages/TransactionPage";
import Index from "./pages/Index";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <UserProvider>
            <Dashboard />
          </UserProvider>
        }
      >
        <Route path="/dashboard" element={<Index />} />

        {/* Module Routes */}
        <Route path="/test" element={<TestPage />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/supplies" element={<SupplyPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/transactions" element={<TransactionPage />} />

        {/* Role Management Routes */}
        <Route
          path="role-management"
          element={
            <OnlySuperAdmins>
              <RolesTable />
            </OnlySuperAdmins>
          }
        />
        <Route path="role-management/assign" element={<RoleAssign />} />
        <Route
          path="role-management/roles-assigned"
          element={<RolesAssignedTable />}
        />
      </Route>
    </Routes>
  );
};

export default App;
