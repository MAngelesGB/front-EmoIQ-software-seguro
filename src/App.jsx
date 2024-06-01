import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import ContentManagementEdit from "./components/contentManager/edit/ContentManagementEdit";
import ContentManagementSuggest from './components/contentManager/suggest/ContentManagementSuggest';
import ContentManagement from "./components/contentManager/manager/ContentManagement";
import AdminPanel from "./components/adminPersonal/AdminPanel";
import Login from './components/Login/Login';
import Layout from './components/partials/Layout';
import Messages from "./components/partials/Messages"; //
import Modal from "react-modal";

import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Feedback from './components/contentManager/Feedback';
import ContentManagementPreview from './components/contentManager/preview/ContentManagementPreview';

Modal.setAppElement("#root");

function App() {
  const { user } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Error");

  const openModal = (message, title = 'Error') => {
    setModalTitle(title);
    setModalMessage(message);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
              <Login openModal={openModal} />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<ProtectedRoute isAllowed={role === 'admin'}><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/personnel" replace />} />
          <Route path="personnel" element={<AdminPanel openModal={openModal} />} />
          <Route path="statistics" element={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><h1>Estadisticas</h1></div>} />
          <Route path="content-suggestions" element={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><h1>Sugerencias de contenido</h1></div>} />
          <Route path="content" element={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><h1>Contenidos</h1></div>} />
        </Route>
        <Route path="/manager" element={<ProtectedRoute isAllowed={role === 'manager'}><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/manager/content" />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="content/:categoryId/suggestion" element={<ContentManagementSuggest openModal={openModal} />} />
          <Route path="content/:categoryId/:lectureId" element={<ContentManagementPreview />} />
          <Route path="content/:categoryId/:lectureId/edit" element={<ContentManagementEdit openModal={openModal} />} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <Messages
        modalIsOpen={modalIsOpen}
        modalMessage={modalMessage}
        closeModal={closeModal}
        modalTitle={modalTitle}
      />
    </BrowserRouter>
  );
}

export default App;
