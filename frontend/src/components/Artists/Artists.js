import React, { useEffect, useState } from "react";
import Collapsible from "../Collapsible";
import ArtistDetails from "./ArtistDetails";
import { fetchArtists } from "../../integration/api";

function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function loadArtists() {
      const data = await fetchArtists();
      setArtists(data);
    }
    loadArtists();
  }, []);

  return (
    <div>
      <h1>Artistas</h1>
      {artists.map((artist) => (
        <Collapsible key={artist.id} title={artist.name}>
          <ArtistDetails artistId={artist.id} />
        </Collapsible>
      ))}
    </div>
  );
}

export default Artists;
