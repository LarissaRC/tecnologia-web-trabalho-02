const BASE_URL = "http://localhost:3000";

export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/user`);
  return response.json();
}

export async function fetchUserDetails(userId) {
  const response = await fetch(`${BASE_URL}/user/${userId}`);
  return response.json();
}

export async function fetchArtists() {
  const response = await fetch(`${BASE_URL}/artist`);
  return response.json();
}
