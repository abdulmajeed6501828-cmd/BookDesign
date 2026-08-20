import React from 'react';

export default function Clients({ isLeft }) {
  return (
    <div className="section-content" style={{ padding: "20px" }}>
      {isLeft ? (
        <div>
          <h2 style={{ fontSize: "24px", marginBottom: "15px", color: "#1e150d" }}>Clients</h2>
          <p>We are proud to have partnered with some of the most innovative companies in the industry.</p>
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: "24px", marginBottom: "15px", color: "#1e150d", opacity: 0 }}>Clients</h2>
          <p>Our clients trust us to deliver exceptional results and we always strive to exceed their expectations.</p>
        </div>
      )}
    </div>
  );
}
