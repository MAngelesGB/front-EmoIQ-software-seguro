import { NavLink } from 'react-router-dom';
import './SideNav.css';

function SideNav({ items }) {
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
      <button className="logout-button">CERRAR SESIÓN</button>
    </div>
  );
}

export default SideNav;
