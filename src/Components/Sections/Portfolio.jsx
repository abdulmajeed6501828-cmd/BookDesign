import React from 'react';

export default function Portfolio({ isLeft }) {
  return (
    <div className="section-content" style={{ padding: "20px" }}>
      {isLeft ? (
        <div>
          <h2 style={{ fontSize: "24px", marginBottom: "15px", color: "#1e150d" }}>Portfolio</h2>
          <p>Here is a selection of our finest work. From web development to full-stack applications...</p>
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: "24px", marginBottom: "15px", color: "#1e150d", opacity: 0 }}>Portfolio</h2>
          <p>Our portfolio showcases a variety of projects that highlight our expertise and dedication to excellence.</p>
        </div>
      )}
    </div>
  );
}
