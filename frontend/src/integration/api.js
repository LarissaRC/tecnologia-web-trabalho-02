const BASE_URL = "http://localhost:3000";

export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/user`);
  return response.json();
}

export async function fetchUserDetails(userId) {
  const response = await fetch(`${BASE_URL}/user/${userId}`);
  return response.json();
}

export async function fetchUserSubscriptions(userId) {
  const response = await fetch(`${BASE_URL}/subscription/${userId}`);
  return response.json();
}

export async function fetchUserPlaylists(userId) {
  const response = await fetch(`${BASE_URL}/playlist/${userId}`);
  return response.json();
}

export async function fetchUserLikedSongs(userId) {
  const response = await fetch(`${BASE_URL}/liked-song/${userId}`);
  return response.json();
}

export async function fetchArtists() {
  const response = await fetch(`${BASE_URL}/artist`);
  return response.json();
}

export async function fetchArtistDetails(artistId) {
  const response = await fetch(`${BASE_URL}/artist/${artistId}`);
  return response.json();
}

export async function fetchArtistAlbums(artistId) {
  const response = await fetch(`${BASE_URL}/album/${artistId}`);
  return response.json();
}
