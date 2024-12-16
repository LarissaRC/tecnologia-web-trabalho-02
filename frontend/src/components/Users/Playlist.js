import React from "react";

function Playlist({ playlistSongs }) {
  if (playlistSongs.length === 0) {
    return <p>Não há músicas para esta playlist.</p>;
  }

  return (
    <div>
      {playlistSongs.map((song) => (
        <h3 key={song.id}>
          #{song.id} - {song.title}
        </h3>
      ))}
    </div>
  );
}

export default Playlist;
