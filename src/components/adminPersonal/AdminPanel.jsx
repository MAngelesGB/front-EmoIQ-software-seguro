import { useState, useEffect } from "react";
import "./AdminPanel.css";
import Modal from "react-modal";
import { changeUserStatus, createUser, deleteUser, listUsers, updateUser } from '../../lib/manageUsers';
import { formatDate } from '../../lib/formatDate';
import { useAuth } from '../../contexts/AuthContext';

Modal.setAppElement("#root");

export default function AdminPanel() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("manager");
  const [isVisible, setIsVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  
  const { user: currentUser } = useAuth();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await listUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    }

    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar datos
    if (fullname === "" || email === "" || (password === "" && editIndex === null)) {
      setModalMessage("Por favor, complete todos los campos.");
      setModalIsOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setModalMessage("Las contraseñas no coinciden.");
      setModalIsOpen(true);
      return;
    }

    const newUser = {
      displayName: fullname,
      email: email,
      role: role
    };

    try {
      if (editIndex === null) {
        // Crear un nuevo usuario
        newUser.password = password;
        const result = await createUser(newUser);
        setUsers([...users, result]);
      } else {
        // Actualizar el usuario existente
        if (password) newUser.password = password;
        const result = await updateUser({ previousEmail: users[editIndex].email, ...newUser });
        const newUsers = [...users];
        newUsers[editIndex] = result;
        setUsers(newUsers);
        setEditIndex(null);
      }
    } catch (err) {
      console.error(err);
    }

    // Limpiar campos
    setFullname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    // Mostrar mensaje de éxito

    console.log("Usuario creado:", {
      fullname,
      email,
      password,
      confirmPassword,
    });
  };

  const handleDeleteUser = async (index) => {
    try {
      await deleteUser({ email: users[index].email });
      const newUsers = [...users];
      newUsers.splice(index, 1);
      setUsers(newUsers);
    } catch(err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (index) => {
    try {
      const data = {
        email: users[index].email,
        disabled: !users[index].disabled
      };
      await changeUserStatus(data);
      const newUsers = [...users];
      newUsers[index].disabled = !newUsers[index].disabled;
      setUsers(newUsers);
    } catch(err) {
      console.error(err);
    }
  };

  const handleEditUser = (index) => {
    const user = users[index];
    setFullname(user.displayName);
    setEmail(user.email);
    // No puedes obtener la contraseña del usuario porque está encriptada
    setIsVisible(true);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <div className="main">
        <div>
          <div className="admin-panel">
            <h2>Control de administrador</h2>
            <div className="button-container">
              {!isVisible && (
                <button className="add-button" onClick={toggleVisibility}>
                  {isVisible ? "Ocultar formulario" : "AGREGAR"}
                </button>
              )}
            </div>
          </div>
          {isVisible && (
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre completo</label>
                  <input
                    type="text"
                    id="name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="ej. Juanito Pérez"
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
                {
                  // currentUser.role === 'superadmin' &&
                  true &&
                  <div className="form-group">
                    <label htmlFor="role">Rol</label>
                    <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="admin">Administrador</option>
                      <option value="manager">Gestor de contenidos</option>
                    </select>
                  </div>
                }
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
            </div>
          )}
        </div>
        <div className="registered-list">
          <h2>Gestores registrados</h2>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Fecha de creación</th>
                  <th>Estado de la cuenta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.displayName}</td>
                    <td>{user.email}</td>
                    <td>{formatDate(user.creationTime)}</td>
                    <td>
                      {user.disabled ? (
                        <span className="inactive">Desactivada</span>
                      ) : (
                        <span className="active">Activa</span>
                      )}
                    </td>
                    <td className="table-manager-actions">
                      <button
                        className="action-button-edit"
                        onClick={() => handleEditUser(index)}
                      >
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.661133 15.0748V17.75C0.661133 17.9047 0.722591 18.0531 0.831987 18.1625C0.941384 18.2719 1.08976 18.3333 1.24447 18.3333H3.92547C4.07988 18.3333 4.22798 18.272 4.3373 18.163L15.36 7.14032L11.86 3.64032L0.832633 14.663C0.723158 14.7721 0.661475 14.9202 0.661133 15.0748ZM13.3043 2.19482L16.8043 5.69482L18.5076 3.99149C18.7263 3.7727 18.8492 3.47601 18.8492 3.16665C18.8492 2.8573 18.7263 2.5606 18.5076 2.34182L16.6585 0.491486C16.4397 0.27277 16.143 0.149902 15.8336 0.149902C15.5243 0.149902 15.2276 0.27277 15.0088 0.491486L13.3043 2.19482Z"
                            fill="black"
                          />
                        </svg>
                      </button>
                      <button
                        className={`action-button-active ${
                          user.disabled ? "yellow" : ""
                        }`}
                        onClick={() => handleToggleActive(index)}
                      >
                        {!user.disabled ? (
                          <svg
                            width="24"
                            height="14"
                            viewBox="0 0 24 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.25 0.25H6.75C3.02812 0.25 0 3.27812 0 7C0 10.7219 3.02812 13.75 6.75 13.75H17.25C20.9719 13.75 24 10.7219 24 7C24 3.27812 20.9719 0.25 17.25 0.25ZM17.25 12.25C16.2116 12.25 15.1966 11.9421 14.3333 11.3652C13.4699 10.7883 12.797 9.9684 12.3996 9.00909C12.0023 8.04978 11.8983 6.99418 12.1009 5.97578C12.3034 4.95738 12.8035 4.02192 13.5377 3.28769C14.2719 2.55346 15.2074 2.05345 16.2258 1.85088C17.2442 1.64831 18.2998 1.75227 19.2591 2.14963C20.2184 2.54699 21.0383 3.2199 21.6152 4.08326C22.1921 4.94661 22.5 5.96165 22.5 7C22.4985 8.39193 21.9449 9.72642 20.9607 10.7107C19.9764 11.6949 18.6419 12.2485 17.25 12.25Z"
                              fill="black"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="24"
                            height="14"
                            viewBox="0 0 24 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.75 13.75L17.25 13.75C20.9719 13.75 24 10.7219 24 7C24 3.27812 20.9719 0.25 17.25 0.25L6.75 0.25C3.02813 0.25 0 3.27812 0 7C0 10.7219 3.02813 13.75 6.75 13.75ZM6.75 1.75C7.78835 1.75 8.80339 2.05791 9.66674 2.63478C10.5301 3.21166 11.203 4.0316 11.6004 4.99091C11.9977 5.95022 12.1017 7.00582 11.8991 8.02422C11.6966 9.04262 11.1965 9.97808 10.4623 10.7123C9.72809 11.4465 8.79263 11.9466 7.77423 12.1491C6.75583 12.3517 5.70023 12.2477 4.74091 11.8504C3.7816 11.453 2.96166 10.7801 2.38478 9.91674C1.80791 9.05339 1.5 8.03835 1.5 7C1.50149 5.60807 2.05509 4.27358 3.03933 3.28933C4.02358 2.30509 5.35807 1.75149 6.75 1.75Z"
                              fill="black"
                            />
                          </svg>
                        )}
                      </button>
                      <button
                        className="action-button-delete"
                        onClick={() => handleDeleteUser(index)}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 5C20.2652 5 20.5196 5.10536 20.7071 5.29289C20.8946 5.48043 21 5.73478 21 6C21 6.26522 20.8946 6.51957 20.7071 6.70711C20.5196 6.89464 20.2652 7 20 7H19L18.997 7.071L18.064 20.142C18.0281 20.6466 17.8023 21.1188 17.4321 21.4636C17.0619 21.8083 16.5749 22 16.069 22H7.93C7.42414 22 6.93707 21.8083 6.56688 21.4636C6.1967 21.1188 5.97092 20.6466 5.935 20.142L5.002 7.072C5.00048 7.04803 4.99982 7.02402 5 7H4C3.73478 7 3.48043 6.89464 3.29289 6.70711C3.10536 6.51957 3 6.26522 3 6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5H20ZM14 2C14.2652 2 14.5196 2.10536 14.7071 2.29289C14.8946 2.48043 15 2.73478 15 3C15 3.26522 14.8946 3.51957 14.7071 3.70711C14.5196 3.89464 14.2652 4 14 4H10C9.73478 4 9.48043 3.89464 9.29289 3.70711C9.10536 3.51957 9 3.26522 9 3C9 2.73478 9.10536 2.48043 9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2H14Z"
                            fill="#F2F2F2"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        contentLabel="Error Message"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <h2>Error</h2>
        <p>{modalMessage}</p>
        <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
      </Modal>
    </div>
  );
}
