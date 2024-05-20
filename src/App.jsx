import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContentManagementEdit from "./components/contentManager/ContentManagementEdit";
import ContentManagement from "./components/contentManager/ContentManagement";
import AdminPanel from "./components/adminPersonal/AdminPanel";
import Header from "./components/partials/Header";
import Navigate from "./components/partials/Navigate";

import "./App.css";

function App() {
  const navItems = [
    { name: "Estadisticas", link: "/", rol: "admin" },
    { name: "Sugerencia de contenidos", link: "/", rol: "admin" },
    { name: "Contenidos desplegados", link: "/", rol: "admin" },
    { name: "Personal", link: "/", rol: "admin" },
    { name: "Gestion de contenidos", link: "/", rol: "gestor de contenidos" },
    { name: "feedback", link: "/", rol: "gestor de contenidos" },
  ];

  return (
    <>
      <Header />
      <BrowserRouter>
        <div className="navbar">
          <Navigate items={navItems} />
        </div>
        <div className="content">
          <Routes>
            <Route path="/login" element={<ContentManagementEdit />}></Route>
            <Route path="/admin" element={<AdminPanel/>}/>
            <Route path="/manager" element={<ContentManagement/>}>
              <Route path="/edit/:id" element={<ContentManagementEdit />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
