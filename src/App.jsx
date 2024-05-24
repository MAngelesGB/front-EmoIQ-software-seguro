import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ContentManagementEdit from "./components/contentManager/ContentManagementEdit";
import ContentManagement from "./components/contentManager/ContentManagement";
import AdminPanel from "./components/adminPersonal/AdminPanel";
import LoginPage from './pages/LoginPage/LoginPage';
import Layout from './components/partials/Layout';

import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useAuth();

  let role = null;
  if (user && user.role) {
    role = user.role;

    if (user.role === 'superadmin') {
      role = 'admin';
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute isAllowed={!user} redirectTo={`/${role}`}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<ProtectedRoute isAllowed={role === 'admin'}><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/personnel" replace />} />
          <Route path="personnel" element={<AdminPanel />} />
        </Route>
        <Route path="/manager" element={<ProtectedRoute isAllowed={role === 'manager'}><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/manager/content-management" />} />
          <Route path="content-management" element={<ContentManagement />} />
          <Route path="content-management/edit/:id" element={<ContentManagementEdit />} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
