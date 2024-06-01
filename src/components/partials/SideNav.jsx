import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './SideNav.css';

function SideNav({ items }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleClick = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.err('Error while signing out');
    }
  };

  return (
    <div className="sideNav">
      <nav>
        <ul className="sideNav-list">
          {items.map(item => (
            <li key={item.name} className="sideNav-list-item">
              <NavLink to={item.link} className="sideNav-item">
                <svg
                  className="sideNav-icon"
                  dangerouslySetInnerHTML={{ __html: item.icon }} />
                <span>
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button className="logout-button" onClick={handleClick}>CERRAR SESIÓN</button>
    </div>
  );
}

export default SideNav;
