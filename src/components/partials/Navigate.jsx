import {Link} from 'react-router-dom'
import './Navigate.css'
export default function Navigate({items}) {
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
