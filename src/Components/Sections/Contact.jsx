import React, { useState } from "react";
import { useApi } from "../../context/apiClient";
import "./Contact.css";

const contactResponsiveStyle = `
  .cp-faq,
  .cp-form-page {
    min-width: 0;
    min-height: 0;
    box-sizing: border-box;
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
    /* Full-height pages. Top/bottom space scales with screen height,
       left/right space stays equal on both pages. */
    .cp-faq,
    .cp-form-page {
      height: 100% !important;
      padding: clamp(40px, 7vh, 68px) 40px !important;
      overflow: hidden !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-start !important;
      box-sizing: border-box;
    }

    .cp-faq-header,
    .cp-form-header {
      height: auto !important;
      min-height: 0;
      margin-bottom: clamp(14px, 2vh, 20px) !important;
      flex-shrink: 0;
    }

    .cp-header-top-row {
      height: auto !important;
      min-height: 0;
      flex-wrap: nowrap;
    }

    .cp-faq-title,
    .cp-form-title {
      font-size: clamp(20px, 2.6vh, 24px) !important;
      white-space: normal;
    }

    .cp-form-sub {
      font-size: clamp(11px, 1.5vh, 12.5px) !important;
      line-height: 1.4 !important;
      margin-top: 8px !important;
      white-space: normal !important;
    }

    /* ---------- FAQ: items spread over the full page height ---------- */
    .cp-faq-list {
      flex: 1 1 auto !important;
      min-height: 0 !important;
      justify-content: space-between !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      scrollbar-width: none;
      -ms-overflow-style: none;
      gap: 0;
    }

    .cp-faq-list::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }

    .cp-faq-btn {
      align-items: flex-start;
      gap: 4px;
      padding: clamp(7px, 1vh, 10px) 0 !important;
    }

    .cp-faq-num {
      font-size: clamp(11px, 1.55vh, 12.5px) !important;
      min-width: 24px !important;
    }

    .cp-faq-q {
      font-size: clamp(11px, 1.55vh, 12.5px) !important;
      line-height: 1.35 !important;
    }

    .cp-faq-ans {
      font-size: clamp(10px, 1.35vh, 11.5px) !important;
      line-height: 1.45 !important;
      padding: 0 8px 10px 28px !important;
    }

    /* ---------- Form: fields fill the page, textarea grows ---------- */
    .cp-form {
      flex: 1 1 auto !important;
      min-height: 0 !important;
      gap: clamp(10px, 1.5vh, 14px) !important;
      overflow: visible !important;
    }

    .cp-field {
      font-size: clamp(11px, 1.5vh, 12.5px) !important;
      min-height: clamp(36px, 5vh, 44px) !important;
      height: clamp(36px, 5.2vh, 46px) !important;
      background-color: #f1f0ed !important;
      border-color: #dad6ce !important;
      box-shadow: none !important;
    }

    .cp-field:focus {
      background-color: #ffffff !important;
      border-color: #b8a47e !important;
    }

    .cp-textarea {
      flex: 1 1 auto !important;
      height: auto !important;
      min-height: 80px !important;
      max-height: none !important;
      resize: none;
    }

    .cp-checkbox-label {
      font-size: clamp(11px, 1.45vh, 12.5px) !important;
      line-height: 1.25 !important;
    }

    .cp-btn-wrap {
      margin-top: 4px;
      justify-content: center;
    }

    .cp-send-btn {
      width: auto !important;
      min-width: 150px;
      padding: clamp(10px, 1.4vh, 13px) 24px !important;
      font-size: clamp(11px, 1.4vh, 12px) !important;
    }

    .cp-footer {
      flex-wrap: wrap;
      gap: 8px 14px;
      align-items: center;
      justify-content: center;
      margin-top: clamp(12px, 2vh, 18px) !important;
      padding-top: 0 !important;
      font-size: clamp(10.5px, 1.4vh, 12px) !important;
    }

    .cp-footer-item {
      font-size: clamp(10.5px, 1.4vh, 12px) !important;
      white-space: normal;
    }
  }

  @media (max-width: 480px) {
    .cp-faq,
    .cp-form-page {
      padding: clamp(34px, 6vh, 56px) 28px !important;
    }

    .cp-faq-q,
    .cp-faq-num {
      font-size: clamp(10.5px, 1.5vh, 12.5px) !important;
    }

    .cp-faq-ans {
      font-size: clamp(9.5px, 1.3vh, 11.5px) !important;
    }

    .cp-field {
      font-size: clamp(10.5px, 1.45vh, 12px) !important;
      height: clamp(34px, 5vh, 44px) !important;
      min-height: clamp(34px, 5vh, 44px) !important;
    }

    .cp-send-btn {
      padding: clamp(9px, 1.35vh, 12px) 22px !important;
      font-size: clamp(10.5px, 1.35vh, 11.5px) !important;
      letter-spacing: 1px !important;
    }
  }
  @media (max-width: 380px) {
    .cp-faq,
    .cp-form-page {
      padding: clamp(24px, 4.4vh, 34px) 20px !important;
    }

    .cp-faq-header,
    .cp-form-header {
      margin-bottom: 12px !important;
    }

    .cp-faq-title,
    .cp-form-title {
      font-size: 19px !important;
    }

    .cp-form-sub {
      font-size: 10.5px !important;
      margin-top: 6px !important;
    }

    .cp-faq-btn {
      padding: 6px 0 !important;
      gap: 3px;
    }

    .cp-faq-num {
      font-size: 10.5px !important;
      min-width: 20px !important;
    }

    .cp-faq-q {
      font-size: 10.5px !important;
      line-height: 1.3 !important;
    }

    .cp-faq-ans {
      font-size: 9.5px !important;
      line-height: 1.4 !important;
      padding: 0 4px 8px 23px !important;
    }

    .cp-form {
      gap: 9px !important;
    }

    .cp-field {
      font-size: 10.5px !important;
      height: 34px !important;
      min-height: 34px !important;
    }

    .cp-textarea {
      height: auto !important;
      min-height: 70px !important;
    }

    .cp-checkbox-label {
      font-size: 10.5px !important;
    }

    .cp-send-btn {
      font-size: 10.5px !important;
      min-width: 140px;
      padding: 10px 20px !important;
    }

    .cp-footer {
      margin-top: 10px !important;
      gap: 6px 12px;
    }

    .cp-footer-item {
      font-size: 10px !important;
    }
  }

  /* ---------- Tablet portrait (iPad Mini, iPad Air, iPad Pro 11" / 13"):
     text, fields and spacing scale with the screen width ---------- */
  @media (min-width: 768px) and (max-width: 1400px) and (orientation: portrait) {
    .cp-faq,
    .cp-form-page {
      height: 100% !important;
      padding: clamp(44px, 6vh, 74px) clamp(48px, 6vw, 80px) !important;
      overflow: hidden !important;
      box-sizing: border-box;
    }

    .cp-faq-header,
    .cp-header-top-row {
      height: clamp(34px, 4.4vw, 56px) !important;
    }

    .cp-faq-header {
      margin-bottom: clamp(24px, 3vw, 40px) !important;
    }

    .cp-form-header {
      margin-bottom: clamp(22px, 2.8vw, 36px) !important;
    }

    .cp-faq-title,
    .cp-form-title {
      font-size: clamp(27px, 3.5vw, 42px) !important;
      letter-spacing: 0.5px !important;
    }

    .cp-form-sub {
      font-size: clamp(14px, 2vw, 25px) !important;
      margin-top: clamp(12px, 1.5vw, 18px) !important;
    }

    /* FAQ list fills the full page height */
    .cp-faq-list {
      flex: 1 1 auto !important;
      min-height: 0 !important;
      justify-content: space-between !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .cp-faq-list::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }

    .cp-faq-btn {
      padding: clamp(11px, 1.4vw, 18px) 0 !important;
    }

    .cp-faq-num {
      font-size: clamp(14px, 2vw, 25px) !important;
      min-width: clamp(32px, 4vw, 54px) !important;
    }

    .cp-faq-q {
      font-size: clamp(14px, 2vw, 25px) !important;
      line-height: 1.25 !important;
    }

    .cp-faq-chevron-icon {
      width: clamp(15px, 2vw, 26px) !important;
      height: clamp(15px, 2vw, 26px) !important;
      margin-left: 14px !important;
    }

    .cp-faq-ans {
      font-size: clamp(12.5px, 1.75vw, 22px) !important;
      line-height: 1.45 !important;
      padding: 0 clamp(16px, 2vw, 28px) clamp(14px, 1.8vw, 22px) clamp(32px, 4vw, 54px) !important;
    }

    /* Contact form */
    .cp-form {
      flex: 1 1 auto !important;
      min-height: 0 !important;
      gap: clamp(16px, 2vw, 26px) !important;
      overflow: visible !important;
    }

    .cp-field {
      font-size: clamp(14px, 2vw, 25px) !important;
      height: clamp(50px, 5.8vw, 76px) !important;
      min-height: clamp(50px, 5.8vw, 76px) !important;
      padding: 0 clamp(18px, 2vw, 26px) !important;
    }

    .cp-textarea {
      height: auto !important;
      flex: 1 1 auto !important;
      min-height: 140px !important;
      max-height: none !important;
      padding-top: clamp(16px, 1.8vw, 24px) !important;
      padding-bottom: clamp(16px, 1.8vw, 24px) !important;
    }

    .cp-checkbox {
      width: clamp(16px, 2vw, 26px) !important;
      height: clamp(16px, 2vw, 26px) !important;
    }

    .cp-checkbox-label {
      font-size: clamp(13px, 1.8vw, 22px) !important;
    }

    .cp-btn-wrap {
      margin-top: clamp(8px, 1vw, 14px) !important;
    }

    .cp-send-btn {
      font-size: clamp(13px, 1.75vw, 22px) !important;
      letter-spacing: 2px !important;
      padding: clamp(15px, 1.8vw, 22px) clamp(56px, 6vw, 80px) !important;
    }

    .cp-footer {
      margin-top: clamp(22px, 2.8vw, 36px) !important;
      padding-top: clamp(18px, 2.2vw, 28px) !important;
      font-size: clamp(13px, 1.8vw, 22px) !important;
    }

    .cp-footer-item {
      font-size: clamp(13px, 1.8vw, 22px) !important;
      gap: 8px;
    }

    .cp-footer-icon {
      width: clamp(15px, 2vw, 26px) !important;
      height: clamp(15px, 2vw, 26px) !important;
    }

    .cp-success {
      font-size: clamp(13px, 1.8vw, 22px) !important;
    }
  }
  /* ---------- Landscape tablet / small laptop (e.g. Nest Hub Max 1280x800):
     tighter page margins so the content fills the full width and height ---------- */
  @media (min-width: 1200px) and (max-width: 1400px) and (min-height: 740px) and (max-height: 860px) {
    .cp-faq {
      padding: clamp(22px, 3.2vh, 30px) clamp(22px, 2.2vw, 28px) clamp(22px, 3.2vh, 30px) clamp(26px, 2.6vw, 34px) !important;
    }

    .cp-form-page {
      padding: clamp(22px, 3.2vh, 30px) clamp(26px, 2.6vw, 34px) clamp(22px, 3.2vh, 30px) clamp(22px, 2.2vw, 28px) !important;
    }

    .cp-faq-header,
    .cp-header-top-row {
      height: 30px !important;
    }

    .cp-faq-header {
      margin-bottom: clamp(14px, 2.2vh, 24px) !important;
    }

    .cp-form-header {
      margin-bottom: clamp(12px, 2vh, 20px) !important;
    }

    .cp-faq-title,
    .cp-form-title {
      font-size: clamp(20px, 2.8vh, 24px) !important;
    }

    .cp-form-sub {
      font-size: clamp(11px, 1.55vh, 13px) !important;
      margin-top: 8px !important;
    }

    /* FAQ list fills the full page height */
    .cp-faq-list {
      flex: 1 1 auto !important;
      min-height: 0 !important;
      justify-content: space-between !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .cp-faq-list::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }

    .cp-faq-btn {
      padding: clamp(6px, 1vh, 10px) 0 !important;
    }

    .cp-faq-num {
      font-size: clamp(11px, 1.55vh, 13px) !important;
      min-width: 28px !important;
    }

    .cp-faq-q {
      font-size: clamp(11px, 1.55vh, 13px) !important;
      line-height: 1.3 !important;
    }

    .cp-faq-chevron-icon {
      width: 13px !important;
      height: 13px !important;
    }

    .cp-faq-ans {
      font-size: clamp(10.5px, 1.4vh, 12px) !important;
      line-height: 1.45 !important;
      padding: 0 12px 10px 28px !important;
    }

    /* Contact form fills the full page height */
    .cp-form {
      flex: 1 1 auto !important;
      min-height: 0 !important;
      gap: clamp(10px, 1.7vh, 16px) !important;
    }

    .cp-field {
      font-size: clamp(11px, 1.5vh, 12.5px) !important;
      height: clamp(38px, 5.2vh, 46px) !important;
    }

    .cp-textarea {
      height: auto !important;
      flex: 1 1 auto !important;
      min-height: 90px !important;
      max-height: none !important;
    }

    .cp-checkbox-label {
      font-size: clamp(10.5px, 1.4vh, 12px) !important;
    }

    .cp-send-btn {
      font-size: clamp(10.5px, 1.4vh, 12px) !important;
      padding: clamp(11px, 1.6vh, 14px) 52px !important;
    }

    .cp-footer {
      margin-top: clamp(14px, 2.2vh, 22px) !important;
      padding-top: clamp(10px, 1.6vh, 16px) !important;
      font-size: clamp(10.5px, 1.4vh, 12px) !important;
    }

    .cp-footer-item {
      font-size: clamp(10.5px, 1.4vh, 12px) !important;
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