import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ContentManagementEdit from "./components/contentManager/edit/ContentManagementEdit";
import ContentManagementSuggest from './components/contentManager/suggest/ContentManagementSuggest';
import ContentManagement from "./components/contentManager/manager/ContentManagement";
import AdminPanel from "./components/adminPersonal/AdminPanel";
import LoginPage from './pages/LoginPage/LoginPage';
import Layout from './components/partials/Layout';

import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Feedback from './components/contentManager/Feedback';

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
          <Route path="statistics" element={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><h1>Estadisticas</h1></div>} />
          <Route path="content-suggestions" element={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><h1>Sugerencias de contenido</h1></div>} />
          <Route path="content" element={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><h1>Contenidos</h1></div>} />
        </Route>
        <Route path="/manager" element={<ProtectedRoute isAllowed={role === 'manager'}><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/manager/content" />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="content/suggestion" element={<ContentManagementSuggest />} />
          <Route path="content/:categoryId/:lectureId" element={<ContentManagementEdit />} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
