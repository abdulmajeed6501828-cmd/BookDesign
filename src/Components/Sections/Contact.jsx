import React from "react";

export default function Contact({ isLeft }) {
  return (
    <div
      className="section-content contact-section"
      style={{
        padding: "clamp(10px, 2vh, 20px)",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {isLeft ? (
        <div className="contact-info">
          <h2
            style={{
              fontSize: "clamp(18px, 3vh, 24px)",
              marginBottom: "clamp(8px, 1.5vh, 12px)",
              color: "#1e150d",
              fontWeight: "600",
            }}
          >
            Contact Us
          </h2>

          <p
            style={{
              fontSize: "clamp(12px, 1.5vh, 14px)",
              lineHeight: "1.5",
              color: "#5c5045",
              marginBottom: "clamp(12px, 2vh, 20px)",
            }}
          >
            Have a question or want to discuss a project? Feel free to get in
            touch with us. We would love to hear from you and help bring your
            ideas to life.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(8px, 1.5vh, 12px)",
              fontSize: "clamp(11px, 1.4vh, 13px)",
              color: "#3d3025",
            }}
          >
            <div>
              <strong>Email</strong>
              <p style={{ margin: "3px 0 0" }}>info@aafidesigns.com</p>
            </div>

            <div>
              <strong>Phone</strong>
              <p style={{ margin: "3px 0 0" }}>+92 300 0000000</p>
            </div>

            <div>
              <strong>Availability</strong>
              <p style={{ margin: "3px 0 0" }}>Mon – Fri, 10:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="contact-form-wrapper">
          <h2
            style={{
              fontSize: "clamp(18px, 3vh, 24px)",
              marginBottom: "clamp(8px, 1.5vh, 16px)",
              color: "#1e150d",
              fontWeight: "600",
            }}
          >
            Get In Touch
          </h2>

          <form
            onSubmit={(e) => { 
              e.preventDefault(); 
              alert("Your message has been sent successfully! The pigeon is on its way.");
              e.target.reset();
            }}
            onPointerDown={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}
            onPointerUp={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}
            onMouseDown={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}
            onMouseUp={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}
            onTouchStart={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}
            onTouchEnd={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}
            onClick={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}
            onKeyDown={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(6px, 1.5vh, 12px)",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "clamp(10px, 1.2vh, 12px)",
                  fontWeight: "600",
                  color: "#3d3025",
                  marginBottom: "clamp(2px, 0.5vh, 5px)",
                }}
              >
                Name
              </label>

              <input
                type="text"
                placeholder="Your name"
                required
                style={{
                  width: "100%",
                  padding: "clamp(6px, 1vh, 9px) 10px",
                  border: "1px solid #cfc4b7",
                  borderRadius: "4px",
                  background: "#faf7f2",
                  color: "#1e150d",
                  fontSize: "clamp(11px, 1.4vh, 13px)",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "clamp(10px, 1.2vh, 12px)",
                  fontWeight: "600",
                  color: "#3d3025",
                  marginBottom: "clamp(2px, 0.5vh, 5px)",
                }}
              >
                Email
              </label>

              <input
                type="email"
                placeholder="Your email"
                required
                style={{
                  width: "100%",
                  padding: "clamp(6px, 1vh, 9px) 10px",
                  border: "1px solid #cfc4b7",
                  borderRadius: "4px",
                  background: "#faf7f2",
                  color: "#1e150d",
                  fontSize: "clamp(11px, 1.4vh, 13px)",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "clamp(10px, 1.2vh, 12px)",
                  fontWeight: "600",
                  color: "#3d3025",
                  marginBottom: "clamp(2px, 0.5vh, 5px)",
                }}
              >
                Message
              </label>

              <textarea
                rows="3"
                placeholder="Write your message..."
                required
                style={{
                  width: "100%",
                  padding: "clamp(6px, 1vh, 9px) 10px",
                  border: "1px solid #cfc4b7",
                  borderRadius: "4px",
                  background: "#faf7f2",
                  color: "#1e150d",
                  fontSize: "clamp(11px, 1.4vh, 13px)",
                  outline: "none",
                  resize: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: "clamp(2px, 0.5vh, 4px)",
                padding: "clamp(8px, 1.5vh, 10px) 18px",
                border: "none",
                borderRadius: "4px",
                background: "#1e150d",
                color: "#fff",
                fontSize: "clamp(11px, 1.4vh, 13px)",
                fontWeight: "600",
                cursor: "pointer",
                letterSpacing: "0.3px",
              }}
            >
              Release the Pigeon 🕊️
            </button>
          </form>
        </div>
      )}
    </div>
  );
}