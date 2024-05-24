import './Header.css';
import logo from '../../assets/emoiq-logo.png'

export default function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 1rem' }}>
      <img src={logo} alt="logo" style={{ width: '20rem' }}/>
      <h1>Panel de control</h1>
      <h2>Administrador</h2>
    </header>
  )
}
