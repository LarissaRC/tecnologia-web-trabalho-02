import React, { useEffect, useState } from "react";
import Collapsible from "../Collapsible";
import { fetchUserPlaylists } from "../../integration/api";
import Playlist from "./Playlist";

function Playlists({ userId }) {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPlaylists() {
      try {
        const data = await fetchUserPlaylists(userId);
        if (data.length === 0) {
          setError("Não há playlists para este usuário.")
        } else {
          setPlaylists(data);
        }
      } catch (err) {
        setError("Erro ao carregar playlists. Tente novamente mais tarde.");
        setPlaylists(null);
      }
    }
    loadPlaylists();
  }, [userId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      {playlists.map((playlist) => (
        <Collapsible key={playlist.id} title={`#${playlist.id}  ${playlist.title}`}>
          <Playlist playlistSongs={playlist.songs} />
        </Collapsible>
      ))}
    </div>
  );
}

export default Playlists;
