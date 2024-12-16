import React, { useEffect, useState } from "react";
import { fetchUserSubscriptions } from "../../integration/api";

function Subscriptions({ userId }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUserSubscriptions() {
      try {
        const data = await fetchUserSubscriptions(userId)
        if (data.message) {
            setError("Não há assinaturas para este usuário.")
        } else {
            setSubscriptions(data);
        }
      } catch (err) {
          setError("Erro ao carregar assinaturas. Tente novamente mais tarde.");
          setSubscriptions(null);
      }
    }
    loadUserSubscriptions();
  }, [userId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      {subscriptions.map((subscription) => (
        <div key={subscription.id}>
          <h3>Assinatura #{subscription.id}</h3>
          <p><strong>Tipo:</strong> {subscription.type}</p>
          <p><strong>Início:</strong> {subscription.begin_date}</p>
          <p>
            <strong>Fim:</strong>{" "}
            {subscription.end_date ? subscription.end_date : "em andamento"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Subscriptions;
