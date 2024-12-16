import React from "react";

function Album({ albumSongs }) {
  if (albumSongs.length === 0) {
    return <p>Não há músicas para este álbum.</p>;
  }

  return (
    <div>
      {albumSongs.map((song) => (
        <h3 key={song.id}>
          #{song.id} - {song.title} - {song.duration} segundos - {song.likeCount} likes
        </h3>
      ))}
    </div>
  );
}

export default Album;
