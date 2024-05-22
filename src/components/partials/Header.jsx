import './Header.css';
import logo from '../../assets/react.svg';

export default function Header() {
  return (
    <>
      <header>
        <img src={logo} alt="logo"/>
        <h1>Panel de control</h1>
      </header>
    </>
  )
}
