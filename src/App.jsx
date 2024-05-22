import Navigate from "./components/partials/Navigate";
import { Routes, Route } from "react-router-dom";
import ContentManagementEdit from "./components/contentManager/ContentManagementEdit";
import AdminPanel from "./components/adminPersonal/AdminPanel";
import Header from "./components/partials/Header";
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
    <AuthProvider>
      <Header />
      <div className="navbar">
        <Navigate items={navItems} />
      </div>
      <div className="content">
        <Routes>
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
  );
}

export default App;
