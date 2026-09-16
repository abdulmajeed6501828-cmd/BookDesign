import React, { useState } from "react";
import { useApi } from "../../context/apiClient";
import "./Contact.css";

const contactResponsiveStyle = `
  .cp-faq,
  .cp-form-page {
    overflow: visible !important;
    min-width: 0;
    min-height: 0;
    box-sizing: border-box;
  }

  .cp-faq-list {
    overflow: visible !important;
    min-height: 0;
  }

  .cp-faq-item {
    min-width: 0;
  }

  .cp-faq-q,
  .cp-faq-ans,
  .cp-form-sub,
  .cp-checkbox-label {
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  @media (max-width: 767px) {
    .cp-faq,
    .cp-form-page {
      padding-top: 8px !important;
      padding-bottom: 8px !important;
      padding-left: 10px !important;
      padding-right: 10px !important;
      overflow: visible !important;
      height: auto !important;
      min-height: 0;
      box-sizing: border-box;
    }

    .cp-faq-header,
    .cp-form-header,
    .cp-header-top-row {
      height: auto !important;
      min-height: 0;
      flex-wrap: nowrap;
    }

    .cp-faq-title,
    .cp-form-title {
      font-size: clamp(16px, 4vw, 18px) !important;
      white-space: normal;
    }

    .cp-form-sub {
      font-size: clamp(9px, 2.8vw, 10px) !important;
      line-height: 1.3 !important;
      white-space: normal !important;
    }

    .cp-faq-list {
      gap: 4px;
      overflow: visible !important;
    }

    .cp-faq-btn {
      align-items: flex-start;
      gap: 4px;
    }

    .cp-faq-num {
      font-size: 8.8px !important;
      min-width: 18px !important;
    }

    .cp-faq-q {
      font-size: 8.7px !important;
      line-height: 1.24 !important;
    }

    .cp-faq-ans {
      font-size: 8px !important;
      line-height: 1.3 !important;
      padding-left: 20px !important;
    }

    .cp-form {
      gap: 7px !important;
      overflow: visible !important;
    }

    .cp-field {
      font-size: 9px !important;
      min-height: 30px !important;
      height: 30px !important;
      background-color: #fff !important;
      box-shadow: none !important;
      border-color: #e2ded7 !important;
    }

    .cp-textarea {
      min-height: 68px !important;
      height: 68px !important;
      resize: vertical;
    }

    .cp-checkbox-label {
      font-size: 8.8px !important;
      line-height: 1.2 !important;
    }

    .cp-btn-wrap {
      margin-top: 4px;
      justify-content: center;
    }

    .cp-send-btn {
      width: auto !important;
      min-width: 130px;
      padding: 8px 20px !important;
      font-size: 8.8px !important;
    }

    .cp-footer {
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      justify-content: center;
      font-size: 8.4px !important;
    }

    .cp-footer-item {
      font-size: 8.4px !important;
      white-space: normal;
    }
  }

  @media (max-width: 480px) {
    .cp-faq,
    .cp-form-page {
      padding-left: 8px !important;
      padding-right: 8px !important;
    }

    .cp-faq-list {
      gap: 3px;
    }

    .cp-faq-q {
      font-size: 8.2px !important;
    }

    .cp-faq-ans {
      font-size: 7.8px !important;
    }

    .cp-field {
      font-size: 8.7px !important;
      height: 29px !important;
    }

    .cp-send-btn {
      padding: 7px 18px !important;
      font-size: 8.2px !important;
      letter-spacing: 1px !important;
    }
  }
`;

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
      "I can begin the front cover, but final print dimensions require the completed page count.",
  },
  {
    id: 3,
    question: "Do you prepare files for IngramSpark, or Lulu as well?",
    answer:
      "Yes, I prepare print-ready files for Amazon KDP. Files for other major publishing platforms are available for an additional fee.",
  },
  {
    id: 4,
    question: "What file formats are delivered upon completion?",
    answer:
      "You'll receive a high-resolution JPG for ebooks and a print-ready PDF for print according to your order.",
  },
  {
    id: 5,
    question: "What is a source file?",
    answer:
      "It is the editable Photoshop file used to create your cover.",
  },
  {
    id: 6,
    question: "What is included in the Social Media Kit?",
    answer:
      "It includes promotional book mockups and social-media-ready graphics.",
  },
  {
    id: 7,
    question: "What is a PDF cover template?",
    answer:
      "It shows the required dimensions, spine, bleed, margins, and barcode area.",
  },
  {
    id: 8,
    question: "Can I request revisions after the order is complete?",
    answer:
      "Revisions should be requested before completion. Later changes may cost extra.",
  },
  {
    id: 9,
    question: "Can you adjust a rejected book cover?",
    answer:
      "Yes, I can correct technical issues based on the publisher's feedback.",
  },
  {
    id: 10,
    question: "What is the stock-image licensing policy?",
    answer:
      "I'll confirm whether the selected stock images or vectors are free or licensed. If licensed assets are required, I'll provide purchase links before final delivery.",
  },
];

export default function Contact({ isLeft }) {
  const { submitContact } = useApi();
  const [openFaq, setOpenFaq] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    agreed: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSubmitting) return;

    setSubmitError("");
    setIsSubmitting(true);
    try {
      await submitContact(formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "", agreed: false });
        setIsSubmitted(false);
      }, 4000);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
     LEFT PAGE — FAQ'S WITH CONTINUOUS GOLD HEADER LINE
  ============================================================ */
  if (isLeft) {
    return (
      <>
        <style>{contactResponsiveStyle}</style>
        <div className="cp-faq" {...sp}>
          {/* Header with Continuous Gold Line */}
          <div className="cp-faq-header">
            <h2 className="cp-faq-title">FAQ's</h2>
            <div className="cp-gold-line" />
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
      </>
    );
  }

  /* ============================================================
     RIGHT PAGE — CONTACT WITH CONTINUOUS GOLD HEADER LINE
  ============================================================ */
  return (
    <>
      <style>{contactResponsiveStyle}</style>
    <div className="cp-form-page" {...sp}>
      {/* Header with Continuous Gold Line */}
      <div className="cp-form-header">
        <div className="cp-header-top-row">
          <h2 className="cp-form-title">Contact</h2>
          <div className="cp-gold-line" />
        </div>
        <p className="cp-form-sub">
          Have a question before starting? Send me a message.
        </p>
      </div>

      {/* Success banner */}
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
          <button type="submit" className="cp-send-btn" disabled={isSubmitting} {...sp}>
            {isSubmitting ? "SENDING..." : "SEND MESSAGE!"}
          </button>
        </div>
        {submitError && <p role="alert">{submitError}</p>}
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
    </>
  );
}