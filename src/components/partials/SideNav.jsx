import {Link} from 'react-router-dom'
import './SideNav.css'

export default function SideNav({items}) {
  return (
    <>
    <aside>
      <nav>
        <ul>
          {items.map((item, index) => (
              <li key={index}>
                <Link to={item.link}>{item.name}</Link>
              </li>
          ))}
        </ul>
      </nav>
    </aside>
    </>
  )
}
