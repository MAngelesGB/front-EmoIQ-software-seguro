import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideNav from './SideNav';
import Icons from '../../assets/icons';
import { useAuth } from '../../contexts/AuthContext';
import './Layout.css';

function Layout({ children }) {
  const { user } = useAuth();

  let role = null;
  if (user && user.role) {
    role = user.role;

    if (user.role === 'superadmin') {
      role = 'admin';
    }
  }

  const navItems = [
    {
      name: 'Estadisticas',
      link: '/admin/statistics',
      role: 'admin',
      icon: Icons.statisticsIcon,
    },
    {
      name: 'Sugerencia de contenidos',
      link: '/admin/content-suggestions',
      role: 'admin',
      icon: Icons.contentSuggestionsIcon,
    },
    {
      name: 'Contenidos desplegados',
      link: '/admin/content',
      role: 'admin',
      icon: Icons.contentIcon,
    },
    {
      name: 'Personal',
      link: '/admin/personnel',
      role: 'admin',
      icon: Icons.personnelIcon,
    },
    {
      name: 'Gestion de contenidos',
      link: '/manager/content',
      role: 'manager',
      icon: Icons.contentIcon,
    },
    {
      name: 'feedback',
      link: '/manager/feedback',
      role: 'manager',
      icon: Icons.feedbackIcon,
    },
  ];

  return (
    <div className="layout-container">
      <Header role={role} />
      <div className="main-wrapper">
        <SideNav items={navItems.filter(item => item.role === role)} />
        <main className="main-content">{children ? children : <Outlet />}</main>
      </div>
    </div>
  );
}

export default Layout;
