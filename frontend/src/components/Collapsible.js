import React, { useState } from "react";

function Collapsible({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
        <h2>{title}</h2>
      </div>
      {isOpen && <div style={{ marginLeft: "20px" }}>{children}</div>}
    </div>
  );
}

export default Collapsible;
