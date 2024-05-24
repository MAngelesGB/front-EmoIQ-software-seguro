import React, { useState } from "react";
import "./AdminPanel.css";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function AdminPanel() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [users, setUsers] = useState([
    {
      name: "Juan Pérez",
      email: "juanitop@gmail.com",
      createdAt: "12/02/2024",
      active: true,
    },
    {
      name: "Julián Fermín",
      email: "juanitop@gmail.com",
      createdAt: "08/01/2024",
      active: true,
    },
    {
      name: "Gerardo Maldonado",
      email: "juanitop@gmail.com",
      createdAt: "02/06/2024",
      active: true,
    },
    {
      name: "Jesús Abelardo Herrera",
      email: "juanitop@gmail.com",
      createdAt: "03/11/2024",
      active: false,
    },
  ]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar datos
    if (name === "" || lastName === "" || email === "" || password === "") {
      setModalMessage("Por favor, complete todos los campos.");
      setModalIsOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setModalMessage("Las contraseñas no coinciden.");
      setModalIsOpen(true);
      return;
    }

    // Crear usuario
    const newUser = {
      name: `${name} ${lastName}`,
      email: email,
      createdAt: new Date().toLocaleDateString(),
      active: true,
    };

    if (editIndex === null) {
      // Crear un nuevo usuario
      setUsers([...users, newUser]);
    } else {
      // Actualizar el usuario existente
      const newUsers = [...users];
      newUsers[editIndex] = newUser;
      setUsers(newUsers);
      setEditIndex(null);
    }

    // Limpiar campos
    setName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  
    // Mostrar mensaje de éxito

    console.log("Usuario creado:", {
      name,
      lastName,
      email,
      password,
      confirmPassword,
    });
  };

  const handleDeleteUser = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  const handleToggleActive = (index) => {
    const newUsers = [...users];
    newUsers[index].active = !newUsers[index].active;
    setUsers(newUsers);
  };

  const handleEditUser = (index) => {
    const user = users[index];
    const [name, lastName] = user.name.split(" ");
    setName(name);
    setLastName(lastName);
    setEmail(user.email);
    // No puedes obtener la contraseña del usuario porque está encriptada
    setIsVisible(true);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <div className="main">
        <h2>Control de administrador</h2>
        <div>
          {!isVisible && (
            <button className="add" onClick={toggleVisibility}>
              {isVisible ? "Ocultar formulario" : "AGREGAR"}
            </button>
          )}
          {isVisible && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre(s)</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ej. Juanito"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Apellidos</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="ej. Pérez Pérez"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ej. kevin123@ejemplo.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="form-group-button">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsVisible(false)}
              >
                CANCELAR
              </button>
              <button type="submit" className="save-button">
                GUARDAR
              </button>
              </div>
            </form>
          )}
        </div>
        <h2>Gestores registrados</h2>
        <table>
          <thead>
            <tr>
              <th>Correo</th>
              <th>Fecha de creación</th>
              <th>Estado de la cuenta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>
                  {user.active ? (
                    <span className="active">Activa</span>
                  ) : (
                    <span className="inactive">Desactivada</span>
                  )}
                </td>
                <td>
                  <button
                    className="action-button-edit"
                    onClick={() => handleEditUser(index)}
                  >
                    <i className="fas fa-pencil-alt">editar</i>
                  </button>
                  <button
                    className={`action-button-active ${
                      user.active ? "" : "yellow"
                    }`}
                    onClick={() => handleToggleActive(index)}
                  >
                    <i
                      className={`fas fa-${
                        user.active ? "toggle-on" : "toggle-off"
                      }`}
                    >
                      desactivar
                    </i>
                  </button>
                  <button
                    className="action-button-delete"
                    onClick={() => handleDeleteUser(index)}
                  >
                    <i className="fas fa-trash-alt">borrar</i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        contentLabel="Error Message"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }
        }}
      >
        <h2>Error</h2>
        <p>{modalMessage}</p>
        <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
      </Modal>
    </div>
  );
}
