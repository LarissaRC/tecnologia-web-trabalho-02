import React, { useEffect, useState } from "react";
import Collapsible from "../Collapsible";
import UserDetails from "./UserDetails";
import { fetchUsers } from "../../integration/api";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const data = await fetchUsers();
      setUsers(data);
    }
    loadUsers();
  }, []);

  return (
    <div>
      <h1>Usuários</h1>
      {users.map((user) => (
        <Collapsible key={user.id} title={user.name}>
          <UserDetails userId={user.id} />
        </Collapsible>
      ))}
    </div>
  );
}

export default Users;
