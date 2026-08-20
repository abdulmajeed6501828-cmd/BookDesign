import React from 'react';

export default function About({ isLeft }) {
  return (
    <div className="section-content" style={{ padding: "20px" }}>
      {isLeft ? (
        <div>
          <h2 style={{ fontSize: "24px", marginBottom: "15px", color: "#1e150d" }}>About Us</h2>
          <p>We are a team of passionate developers, designers, and creators.</p>
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: "24px", marginBottom: "15px", color: "#1e150d", opacity: 0 }}>About Us</h2>
          <p>With years of experience under our belts, we bring a wealth of knowledge and creativity to every project we undertake.</p>
        </div>
      )}
    </div>
  );
}
