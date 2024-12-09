import { Link } from "react-router-dom";
import { useUser } from "../components/UserContext";
import { logout } from "../api";

const Navbar = () => {
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user} </span>
          <Link to="/products" style={{ marginRight: '10px' }}>Products</Link>
          <Link to="/cart" style={{ marginRight: '10px' }}>Cart</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
