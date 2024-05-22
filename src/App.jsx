import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContentManagementEdit from "./components/contentManager/ContentManagementEdit";
import ContentManagement from "./components/contentManager/ContentManagement";
import AdminPanel from "./components/adminPersonal/AdminPanel";
import Header from "./components/partials/Header";
import Navigate from "./components/partials/Navigate";

import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const navItems = [
    { name: "Estadisticas", link: "/", rol: "admin" },
    { name: "Sugerencia de contenidos", link: "/", rol: "admin" },
    { name: "Contenidos desplegados", link: "/", rol: "admin" },
    { name: "Personal", link: "/adminPanel", rol: "admin" },
    { name: "Gestion de contenidos", link: "/", rol: "manager" },
    { name: "feedback", link: "/", rol: "manager" },
  ];

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="navbar">
          <Navigate items={navItems} />
        </div>
        <div className="content">
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectedRoute>
                  <ContentManagementEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager"
              element={
                <ProtectedRoute>
                  <ContentManagementEdit />
                </ProtectedRoute>
              }
            >
              <Route
                path="/edit/:id"
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
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
