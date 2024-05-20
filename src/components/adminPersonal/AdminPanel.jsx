import React, { useState } from 'react';

function AdminPanel() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [users, setUsers] = useState([
    {
      name: 'Juan Pérez',
      email: 'juanitop@gmail.com',
      createdAt: '12/02/2024',
      active: true,
    },
    {
      name: 'Julián Fermín',
      email: 'juanitop@gmail.com',
      createdAt: '08/01/2024',
      active: true,
    },
    {
      name: 'Gerardo Maldonado',
      email: 'juanitop@gmail.com',
      createdAt: '02/06/2024',
      active: true,
    },
    {
      name: 'Jesús Abelardo Herrera',
      email: 'juanitop@gmail.com',
      createdAt: '03/11/2024',
      active: false,
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar datos
    // Guardar usuario en la base de datos
    // Actualizar el estado de los usuarios
    console.log('Usuario creado:', {
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

  return (
    <div className="container">
    {/* Aquí va el código de la barra de navegación */}
    {/* <Navbar /> */}
      <div className="main">
        <h2>Control de administrador</h2>
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
          <button type="button" className="cancel-button">
            CANCELAR
          </button>
          <button type="submit" className="save-button">
            Guardar
          </button>
        </form>
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
                    className="action-button"
                    onClick={() => handleToggleActive(index)}
                  >
                    <i className={`fas fa-${user.active ? 'toggle-on' : 'toggle-off'}`}></i>
                  </button>
                  <button
                    className="action-button"
                    onClick={() => handleDeleteUser(index)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                  <button className="action-button">
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;