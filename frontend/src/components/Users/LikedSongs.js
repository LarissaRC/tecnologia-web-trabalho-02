import React, { useEffect, useState } from "react";
import { fetchUserLikedSongs } from "../../integration/api";

function LikedSongs({ userId }) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPlaylists() {
      try {
        const data = await fetchUserLikedSongs(userId);
        if (data.length === 0) {
          setError("Não há músicas curtidas para este usuário.")
        } else {
          setLikedSongs(data);
        }
      } catch (err) {
        setError("Erro ao carregar músicas curtidas. Tente novamente mais tarde.");
        setLikedSongs(null);
      }
    }
    loadPlaylists();
  }, [userId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      {likedSongs.map((likedSong) => (
        <h3 key={likedSong.id}>
          #{likedSong.id} - {likedSong.title} - {likedSong.duration} segundos
        </h3>
      ))}
    </div>
  );
}

export default LikedSongs;
