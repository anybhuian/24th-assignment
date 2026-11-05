
import useFavoriteStore from "../store/useFavoriteStore.js";

function UserCard({ user, onDetails }) {
  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  const toggleFavorite = useFavoriteStore(
    (state) => state.toggleFavorite
  );

  const isFavorite = favorites.some(
    (item) => item.id === user.id
  );

  return (
    <div className="user-card">
      <div className="avatar">
        {user.name.charAt(0)}
      </div>

      <h3>{user.name}</h3>

      <p>📧 {user.email}</p>
      <p>📞 {user.phone}</p>

      <div className="card-buttons">
        <button onClick={() => onDetails(user)}>
          Details
        </button>

        <button
          className={isFavorite ? "favorite active" : "favorite"}
          onClick={() => toggleFavorite(user)}
        >
          {isFavorite ? "❤️ Favorited" : "🤍 Favorite"}
        </button>
      </div>
    </div>
  );
}

export default UserCard;
