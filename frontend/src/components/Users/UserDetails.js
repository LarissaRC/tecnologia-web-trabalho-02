import React, { useEffect, useState } from "react";
import Collapsible from "../Collapsible";
import Playlists from "./Playlists";
import Subscriptions from "./Subscriptions";
import LikedSongs from "./LikedSongs";
import { fetchUserDetails } from "../../integration/api";

function UserDetails({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUserDetails() {
      const data = await fetchUserDetails(userId);
      setUser(data);
    }
    loadUserDetails();
  }, [userId]);

  if (!user) return <p>Carregando...</p>;

  return (
    <div>
      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>

      <Collapsible title="Assinaturas">
        <Subscriptions userId={userId} />
      </Collapsible>
      <Collapsible title="Playlists">
        <Playlists userId={userId} />
      </Collapsible>
      <Collapsible title="Músicas Curtidas">
        <LikedSongs userId={userId} />
      </Collapsible>
    </div>
  );
}

export default UserDetails;
