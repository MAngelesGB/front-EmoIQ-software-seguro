import './Layout.css';
import Header from './Header';
import SideNav from './SideNav';
import Icons from '../../assets/icons';

function Layout({ children }) {
  const navItems = [
    { name: "Estadisticas", link: "/", role: "admin", icon: Icons.statisticsIcon },
    { name: "Sugerencia de contenidos", link: "/", role: "admin", icon: Icons.contentSuggestionsIcon },
    { name: "Contenidos desplegados", link: "/", role: "admin", icon: Icons.contentIcon },
    { name: "Personal", link: "/adminPanel", role: "admin", icon: Icons.personnelIcon },
    { name: "Gestion de contenidos", link: "/", role: "manager", icon: Icons.contentIcon },
    { name: "feedback", link: "/", role: "manager", icon: Icons.feedbackIcon },
  ];

  return (
    <div className="layout-container">
      <Header />
      <div className="main-wrapper">
        <SideNav items={navItems} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
