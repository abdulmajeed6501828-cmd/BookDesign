import React from 'react';

export default function Contact({ isLeft }) {
  return (
    <div className="section-content" style={{ padding: "20px" }}>
      {isLeft ? (
        <div>
          <h2 style={{ fontSize: "24px", marginBottom: "15px", color: "#1e150d" }}>Contact</h2>
          <p>Get in touch with us today! We'd love to hear from you.</p>
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: "24px", marginBottom: "15px", color: "#1e150d", opacity: 0 }}>Contact</h2>
          <p>Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.</p>
        </div>
      )}
    </div>
  );
}
