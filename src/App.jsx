//import { useState } from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import ContentManagementEdit from "./components/contentManager/ContentManagementEdit";
//import ContentManagement from "./components/contentManager/ContentManagement";
import AdminPanel from "./components/adminPersonal/AdminPanel";

import "./App.css";
//import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from './pages/LoginPage/LoginPage';
import Layout from './components/partials/Layout';

function App() {
  return (
    <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectedRoute>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/*"
              element={
                <ProtectedRoute>
                  <ContentManagementEdit />
                </ProtectedRoute>
              }
            >
              <Route
                path="manager/edit/:id"
                element={
                  <ProtectedRoute>
                    <ContentManagementEdit />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
  );
}

export default App;
