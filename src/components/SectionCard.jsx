import { useState } from "react";

export default function SectionCard({ title, children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="card">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <h3>{title}</h3>
        <button className="toggle-btn">
          {open ? "-" : "+"}
        </button>
      </div>

      {open && <div style={{ marginTop: "15px" }}>{children}</div>}
    </div>
  );
}
