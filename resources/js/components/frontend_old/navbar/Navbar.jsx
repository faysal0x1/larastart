
import TopBar from './TopBar';
import MainNav from './MainNav';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <MainNav />
    </header>
  );
};

export default Navbar;