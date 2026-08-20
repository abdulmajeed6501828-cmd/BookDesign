import React from 'react';

export default function Home({ isLeft }) {
  return (
    <div className="section-content" style={{ padding: "20px" }}>
      {isLeft ? (
        <div>
          <h2 style={{ fontSize: "24px", marginBottom: "15px", color: "#1e150d" }}>Home</h2>
          <p>Welcome to our Home page. We specialize in delivering high-quality, professional solutions designed to meet your every need.</p>
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: "24px", marginBottom: "15px", color: "#1e150d", opacity: 0 }}>Home</h2>
          <p>Explore our offerings and discover what makes us unique. We bring creativity and excellence together.</p>
        </div>
      )}
    </div>
  );
}
