
import useFavoriteStore from "../store/useFavoriteStore.js";

function Navbar({ totalUsers }) {
  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  return (
    <nav className="navbar">
      <h2>👥 User Management</h2>

      <div className="nav-info">
        <span>Total Users: {totalUsers}</span>
        <span>❤️ Favorites: {favorites.length}</span>
      </div>
    </nav>
  );
}

export default Navbar;
