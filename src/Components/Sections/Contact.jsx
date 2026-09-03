import React, { useState } from "react";
import "./Contact.css";

const FAQ_ITEMS = [
  {
    id: 1,
    question: "What information do you need to get started?",
    answer:
      "Everything I need is included in the requirements form you'll complete after placing your order.",
  },
  {
    id: 2,
    question: "What if my book is not yet formatted?",
    answer:
      "We provide complete manuscript formatting for print and eBook formats.",
  },
  {
    id: 3,
    question: "Do you prepare files for IngramSpark, or Lulu as well?",
    answer:
      "Yes — files are prepared to KDP, IngramSpark, Lulu, and Barnes & Noble specs.",
  },
  {
    id: 4,
    question: "What file formats are delivered upon completion?",
    answer:
      "Print-ready PDFs (CMYK, 300 DPI), digital EPUB files, and layered source files.",
  },
  {
    id: 5,
    question: "What is a source file?",
    answer:
      "The original editable project file (e.g. InDesign .indd or Illustrator .ai).",
  },
  {
    id: 6,
    question: "What is included in the Social Media Kit?",
    answer:
      "3D book mockups, promotional banners, and social graphics for Instagram and Facebook.",
  },
  {
    id: 7,
    question: "What is a PDF cover template?",
    answer:
      "A layout file from the printer tailored to your exact trim size, page count, and paper type.",
  },
  {
    id: 8,
    question: "Can I request revisions after the order is complete?",
    answer:
      "Yes, minor tweaks and text adjustments are included to ensure 100% satisfaction.",
  },
  {
    id: 9,
    question: "Can you adjust a rejected book cover?",
    answer:
      "Absolutely — we fix trim, barcode, margin, spine, and color profile rejections.",
  },
  {
    id: 10,
    question: "What is the stock-image licensing policy?",
    answer:
      "All stock imagery is licensed for commercial distribution within standard print limits.",
  },
];

export default function Contact({ isLeft }) {
  const [openFaq, setOpenFaq] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    agreed: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "", agreed: false });
      setIsSubmitted(false);
    }, 4000);
  };

  // Block all pointer/keyboard events from bubbling to the book flipper
  const sp = {
    onPointerDown: (e) => { e.stopPropagation(); e.nativeEvent?.stopImmediatePropagation(); },
    onPointerUp: (e) => { e.stopPropagation(); e.nativeEvent?.stopImmediatePropagation(); },
    onMouseDown: (e) => { e.stopPropagation(); e.nativeEvent?.stopImmediatePropagation(); },
    onMouseUp: (e) => { e.stopPropagation(); e.nativeEvent?.stopImmediatePropagation(); },
    onTouchStart: (e) => { e.stopPropagation(); e.nativeEvent?.stopImmediatePropagation(); },
    onTouchEnd: (e) => { e.stopPropagation(); e.nativeEvent?.stopImmediatePropagation(); },
    onClick: (e) => { e.stopPropagation(); e.nativeEvent?.stopImmediatePropagation(); },
    onKeyDown: (e) => { e.stopPropagation(); e.nativeEvent?.stopImmediatePropagation(); },
  };

  /* ============================================================
     LEFT PAGE — FAQ (Exact visual match to reference image)
  ============================================================ */
  if (isLeft) {
    return (
      <div className="cp-faq" {...sp}>
        {/* Header — "faq's (frequently asked questions)" */}
        <div className="cp-faq-header">
          <span className="cp-faq-title">faq's</span>
          <span className="cp-faq-sub">(frequently asked questions)</span>
        </div>

        {/* FAQ list */}
        <div className="cp-faq-list">
          {FAQ_ITEMS.map((item) => {
            const open = openFaq === item.id;
            return (
              <div key={item.id} className="cp-faq-item">
                <button
                  type="button"
                  className="cp-faq-btn"
                  onClick={(e) => toggleFaq(item.id, e)}
                >
                  <span className="cp-faq-num">{item.id}.</span>
                  <span className="cp-faq-q">{item.question}</span>
                  {/* Clean SVG Chevron Arrow matching reference image */}
                  <svg
                    className={`cp-faq-chevron-icon${open ? " open" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {open && <p className="cp-faq-ans">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ============================================================
     RIGHT PAGE — CONTACT FORM
  ============================================================ */
  return (
    <div className="cp-form-page" {...sp}>

      {/* Header */}
      <div className="cp-form-header">
        <h2 className="cp-form-title">get in touch</h2>
        <p className="cp-form-sub">
          Have a question before starting? Send me a message.
        </p>
      </div>

      {/* Success toast */}
      {isSubmitted && (
        <div className="cp-success">
          ✓ Message sent! I'll get back to you soon.
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="cp-form" {...sp}>

        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name *"
          required
          className="cp-field"
          {...sp}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email *"
          required
          className="cp-field"
          {...sp}
        />

        {/* Subject */}
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Subject"
          className="cp-field"
          {...sp}
        />

        {/* Message */}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Message"
          required
          className="cp-field cp-textarea"
          {...sp}
        />

        {/* Checkbox row */}
        <label className="cp-checkbox-row" {...sp}>
          <input
            type="checkbox"
            name="agreed"
            checked={formData.agreed}
            onChange={handleInputChange}
            required
            className="cp-checkbox"
            {...sp}
          />
          <span className="cp-checkbox-label">
            I agree to be contacted about my enquiry.
          </span>
        </label>

        {/* Send button */}
        <div className="cp-btn-wrap">
          <button type="submit" className="cp-send-btn" {...sp}>
            SEND MESSAGE!
          </button>
        </div>

      </form>

      {/* Footer */}
      <div className="cp-footer">
        <a
          href="mailto:hello@aafidesigns.com"
          className="cp-footer-item"
          {...sp}
        >
          <svg
            className="cp-footer-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 7l10 7 10-7" />
          </svg>
          hello@aafidesigns.com
        </a>

        <div className="cp-footer-item">
          <svg
            className="cp-footer-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21c-4-4-7-8-7-12a7 7 0 1 1 14 0c0 4-3 8-7 12z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          Lisbon, Portugal
        </div>
      </div>

    </div>
  );
}