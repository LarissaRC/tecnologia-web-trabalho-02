import React, { useEffect, useState } from "react";
import Collapsible from "../Collapsible";
import { fetchArtistAlbums } from "../../integration/api";
import Album from "./Album";

function Albums({ artistId }) {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPlaylists() {
      try {
        const data = await fetchArtistAlbums(artistId);
        if (data.length === 0) {
          setError("Não há álbuns para este artista.")
        } else {
            setAlbums(data);
        }
      } catch (err) {
        setError("Erro ao carregar álbuns. Tente novamente mais tarde.");
        setAlbums(null);
      }
    }
    loadPlaylists();
  }, [artistId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      {albums.map((album) => (
        <Collapsible key={album.id} title={`#${album.id} ${album.title}`}>
          <div>
            <p><strong>Data de lançamento:</strong> {album.release_date}</p>
            <p>
              <strong>Gêneros:</strong>{" "}
              {album.genres.map((genre) => (
                <span
                  className="genre-badge"
                  key={genre.id}
                >
                  {genre.title}
                </span>
              ))}
            </p>
          </div>
          <Album albumSongs={album.songs} />
        </Collapsible>
      ))}
    </div>
  );
}

export default Albums;
