
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import UserCard from "./components/UserCard";
import useFavoriteStore from "./store/useFavoriteStore.js";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  const displayedUsers = showFavorites ? favorites : users;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar totalUsers={users.length} />

      <main className="container">
        <h1>User Management App</h1>
        <p className="subtitle">Manage your users easily</p>

        <div className="filter-buttons">
          <button onClick={() => setShowFavorites(false)}>
            All Users
          </button>

          <button onClick={() => setShowFavorites(true)}>
            ❤️ Favorite Users ({favorites.length})
          </button>
        </div>

        {loading ? (
          <h2>Loading users...</h2>
        ) : displayedUsers.length === 0 ? (
          <h2>No favorite users yet!</h2>
        ) : (
          <div className="user-grid">
            {displayedUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDetails={setSelectedUser}
              />
            ))}
          </div>
        )}

        {selectedUser && (
          <div className="modal">
            <div className="modal-content">
              <h2>{selectedUser.name}</h2>

              <p>Email: {selectedUser.email}</p>
              <p>Phone: {selectedUser.phone}</p>
              <p>Username: {selectedUser.username}</p>
              <p>Website: {selectedUser.website}</p>

              <button onClick={() => setSelectedUser(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;

