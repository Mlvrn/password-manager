import { Camera } from '@mui/icons-material';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ style }) => {
  return (
    <nav className={style.navbar}>
      <Container className={style.nav_container}>
        <Link to="/" className={style.logo}>
          <Camera className={style.icon} />
          <h1>PassPortal</h1>
          <Camera className={style.icon} />
        </Link>
      </Container>
    </nav>
  );
};

export default Navbar;
