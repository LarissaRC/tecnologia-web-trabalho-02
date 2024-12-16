import React, { useEffect, useState } from "react";
import Collapsible from "../Collapsible";
import { fetchArtistDetails } from "../../integration/api";
import Albums from "./Albums";

function ArtistDetails({ artistId }) {
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    async function loadArtistDetails() {
      const data = await fetchArtistDetails(artistId);
      setArtist(data);
    }
    loadArtistDetails();
  }, [artistId]);

  if (!artist) return <p>Carregando...</p>;

  return (
    <div>
      <p><strong>Nome:</strong> {artist.name}</p>
      <p><strong>Bio:</strong>{" "}
        {artist.bio ? artist.bio : "Não informado"}
    </p>

      <Collapsible title="Álbuns">
        <Albums artistId={artistId} />
      </Collapsible>
    </div>
  );
}

export default ArtistDetails;
