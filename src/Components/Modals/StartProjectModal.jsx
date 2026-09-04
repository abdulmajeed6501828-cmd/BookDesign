import React, { useState, useRef, useEffect, useCallback } from "react";
import logoImg from "../../assets/AAFI-Logo.png";
import "./StartProjectModal.css";

/* ================================================================
   UPLOAD ICON SVG
   ================================================================ */

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

/* ================================================================
   UPLOAD BOX (reusable within the modal)
   ================================================================ */

const UploadBox = ({ label, value, inputRef, onChange, accept, stopProp }) => (
  <div
    className="spm-upload-box"
    onClick={(e) => {
      stopProp(e);
      inputRef?.current?.click();
    }}
  >
    <UploadIcon />
    <span>{value || label}</span>
    {inputRef && (
      <input
        type="file"
        ref={inputRef}
        accept={accept}
        style={{ display: "none" }}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
      />
    )}
  </div>
);

/* ================================================================
   MAIN MODAL COMPONENT
   ================================================================ */

export default function StartProjectModal({ isOpen, onClose }) {
  /* ----------------------------------------------------------------
     PACKAGE & FORMAT STATE
     ---------------------------------------------------------------- */
  const [selectedPkg, setSelectedPkg]     = useState("starter");
  const [coverType, setCoverType]         = useState("Hardcover");
  const [preference, setPreference]       = useState("Typographic");
  const [declared, setDeclared]           = useState(false);
  const [submitted, setSubmitted]         = useState(false);

  /* ----------------------------------------------------------------
     FORM DATA STATE
     ---------------------------------------------------------------- */
  const [form, setForm] = useState({
    clientName:          "",
    emailAddress:        "",
    bookTitle:           "",
    subtitle:            "",
    secondSubtitle:      "",
    authorName:          "",
    authorPhoto:         null,
    bookDescription:     "",
    authorBio:           "",
    additionalDocument:  null,
    trimSize:            "",
    pageCount:           "",
    paperType:           "White",
    spineWidth:          "",
    pdfTemplate:         null,
    designInstructions:  "",
    inspirationSample1:  null,
    inspirationSample2:  null,
    inspirationSample3:  null,
    isbnCode:            "",
    isbnFile:            null,
  });

  /* ----------------------------------------------------------------
     FILE INPUT REFS
     ---------------------------------------------------------------- */
  const authorPhotoRef   = useRef(null);
  const addDocRef        = useRef(null);
  const pdfTemplateRef   = useRef(null);
  const sample1Ref       = useRef(null);
  const sample2Ref       = useRef(null);
  const sample3Ref       = useRef(null);
  const isbnFileRef      = useRef(null);

  /* ----------------------------------------------------------------
     EVENT PROPAGATION BLOCKER
     Prevents any click/pointer inside the modal from
     bubbling up to the book-flip controller.
     ---------------------------------------------------------------- */
  const stopProp = useCallback((e) => {
    e.stopPropagation();
    e.nativeEvent?.stopImmediatePropagation();
  }, []);

  /* ----------------------------------------------------------------
     ESCAPE KEY → CLOSE
     ---------------------------------------------------------------- */
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  /* ----------------------------------------------------------------
     LOCK BODY SCROLL WHILE OPEN
     ---------------------------------------------------------------- */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* ----------------------------------------------------------------
     HELPERS
     ---------------------------------------------------------------- */
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e, field) => {
    const file = e.target.files[0];
    if (file) setForm((prev) => ({ ...prev, [field]: file.name }));
  };

  const handleSubmit = (e) => {
    stopProp(e);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onClose(); }, 2800);
  };

  /* ----------------------------------------------------------------
     EARLY RETURN IF CLOSED
     ---------------------------------------------------------------- */
  if (!isOpen) return null;

  /* ----------------------------------------------------------------
     PACKAGES
     ---------------------------------------------------------------- */
  const packages = [
    { id: "starter",  label: "Starter",  price: "$150" },
    { id: "basic",    label: "Basic",    price: "$200" },
    { id: "premium",  label: "Premium",  price: "$350" },
    { id: "business", label: "Business", price: "$500" },
  ];

  /* ----------------------------------------------------------------
     RENDER
     ---------------------------------------------------------------- */
  return (
    <div
      className="spm-overlay"
      onClick={(e) => { stopProp(e); onClose(); }}
    >
      <div
        className="spm-modal"
        onClick={stopProp}
        onPointerDown={stopProp}
        onPointerUp={stopProp}
        onMouseDown={stopProp}
        onTouchStart={stopProp}
      >

        {/* ============================================================
            HEADER
            ============================================================ */}
        <div className="spm-header">

          {/* Logo */}
          <div className="spm-header-logo">
            <img src={logoImg} alt="AAFI Designs" />
            {/* <span className="spm-logo-text">AAFI DESIGNS</span> */}
          </div>

          {/* Title */}
          <div className="spm-header-center">
            <h2 className="spm-header-title">start a project</h2>
            <p className="spm-header-subtitle">
              Tell us about your book and design requirements
            </p>
          </div>

          {/* Right: page label + close */}
          <div className="spm-header-right">
            <span className="spm-page-label">
              PROJECT DETAILS
              <span className="spm-page-dot" />
              1 OF 1
            </span>
            <button
              className="spm-close-btn"
              onClick={(e) => { stopProp(e); onClose(); }}
              aria-label="Close"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ============================================================
            BODY — two columns
            ============================================================ */}
        <div className="spm-body">

          {/* -------------------------------------------------------
              LEFT COLUMN
              ------------------------------------------------------- */}
          <div className="spm-col-left">

            {/* ── YOUR DETAILS ── */}
            <p className="spm-section-heading">Your Details</p>

            <div className="spm-row">
              <div className="spm-field">
                <input
                  className="spm-input"
                  type="text"
                  name="clientName"
                  placeholder="Client Name:"
                  value={form.clientName}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
              <div className="spm-field">
                <input
                  className="spm-input"
                  type="email"
                  name="emailAddress"
                  placeholder="Email Address:"
                  value={form.emailAddress}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
            </div>

            {/* ── BOOK INFORMATION ── */}
            <p className="spm-section-heading" style={{ marginTop: "2px" }}>
              Book Information
            </p>

            <input
              className="spm-input"
              type="text"
              name="bookTitle"
              placeholder="Book Title:"
              value={form.bookTitle}
              onChange={handleInput}
              onClick={stopProp}
            />

            <div className="spm-row">
              <div className="spm-field">
                <input
                  className="spm-input"
                  type="text"
                  name="subtitle"
                  placeholder="Subtitle:"
                  value={form.subtitle}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
              <div className="spm-field">
                <input
                  className="spm-input"
                  type="text"
                  name="secondSubtitle"
                  placeholder="Second subtitle (optional):"
                  value={form.secondSubtitle}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
            </div>

            {/* Author name + Author Photo */}
            <div className="spm-row spm-author-row">
              <div className="spm-field" style={{ flex: 1 }}>
                <input
                  className="spm-input"
                  type="text"
                  name="authorName"
                  placeholder="Author name:"
                  value={form.authorName}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
              <div className="spm-author-photo">
                <span className="spm-author-photo-label">Author Photo:</span>
                <UploadBox
                  label="Upload a file"
                  value={form.authorPhoto}
                  inputRef={authorPhotoRef}
                  onChange={(e) => handleFile(e, "authorPhoto")}
                  stopProp={stopProp}
                />
              </div>
            </div>

            {/* Book description */}
            <textarea
              className="spm-textarea"
              name="bookDescription"
              placeholder="Book description: (for back cover)"
              value={form.bookDescription}
              onChange={handleInput}
              onClick={stopProp}
              style={{ minHeight: "55px", resize: "none" }}
            />

            {/* Author Bio */}
            <textarea
              className="spm-textarea"
              name="authorBio"
              placeholder="Author Bio: (for back cover)"
              value={form.authorBio}
              onChange={handleInput}
              onClick={stopProp}
              style={{ minHeight: "55px", resize: "none" }}
            />


          </div>



          {/* -------------------------------------------------------
              RIGHT COLUMN
              ------------------------------------------------------- */}
          <div className="spm-col-right">

            {/* ── PACKAGE & FORMAT ── */}
            <p className="spm-section-heading">Package &amp; Format</p>

            {/* Package selector buttons */}
            <div className="spm-pkg-group">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  className={`spm-pkg-btn ${selectedPkg === pkg.id ? "active" : ""}`}
                  onClick={(e) => { stopProp(e); setSelectedPkg(pkg.id); }}
                >
                  <span className="spm-pkg-name">{pkg.label}</span>
                  <span className="spm-pkg-price">{pkg.price}</span>
                </button>
              ))}
            </div>

            {/* Book Cover Type */}
            <div className="spm-cover-type-row">
              <span className="spm-cover-type-label">Book Cover Type:</span>
              {["Ebook", "Paperback", "Hardcover", "Jacket"].map((type) => (
                <label key={type} className="spm-radio-item" onClick={stopProp}>
                  <input
                    type="radio"
                    name="coverType"
                    value={type}
                    checked={coverType === type}
                    onChange={() => setCoverType(type)}
                  />
                  {type}
                </label>
              ))}
            </div>

            {/* Specs grid */}
            <div className="spm-specs-grid">
              <div className="spm-field">
                <span className="spm-label">Trim Size:</span>
                <input
                  className="spm-input"
                  type="text"
                  name="trimSize"
                  placeholder="i.e. 6x9"
                  value={form.trimSize}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
              <div className="spm-field">
                <span className="spm-label">Page Count:</span>
                <input
                  className="spm-input"
                  type="text"
                  name="pageCount"
                  value={form.pageCount}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
              <div className="spm-field">
                <span className="spm-label">Paper Type:</span>
                <select
                  className="spm-select"
                  name="paperType"
                  value={form.paperType}
                  onChange={handleInput}
                  onClick={stopProp}
                >
                  <option value="White">White</option>
                  <option value="Cream">Cream</option>
                  <option value="White/Cream">White/Cream</option>
                  <option value="Color">Standard Color</option>
                </select>
              </div>
              <div className="spm-field">
                <span className="spm-label">Spine Width:</span>
                <input
                  className="spm-input"
                  type="text"
                  name="spineWidth"
                  placeholder="i.e. 0.250 in"
                  value={form.spineWidth}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
            </div>

            {/* Print Cover Template */}
            <div className="spm-field">
              <span className="spm-upload-label">
                Print Cover Template (for Paperback/Hardcover):
              </span>
              <UploadBox
                label="Upload PDF Template"
                value={form.pdfTemplate}
                inputRef={pdfTemplateRef}
                onChange={(e) => handleFile(e, "pdfTemplate")}
                accept=".pdf"
                stopProp={stopProp}
              />
            </div>

            {/* KDP note */}
            <p className="spm-kdp-note">
              To find out the exact dimensions of your cover, visit Amazon KDP Cover Calculator:{" "}
              <a
                href="https://kdp.amazon.com/cover-calculator"
                target="_blank"
                rel="noreferrer"
                className="spm-kdp-link"
                onClick={stopProp}
              >
                https://kdp.amazon.com/cover-calculator
              </a>{" "}
              and upload the PDF template.
            </p>

            <div className="spm-divider" />

            {/* ── CREATIVE DIRECTION ── */}
            <p className="spm-section-heading">Creative Direction</p>

            {/* Design Needs */}
            <div className="spm-field">
              <span className="spm-label">Design Needs / Instructions:</span>
              <textarea
                className="spm-textarea spm-textarea-short"
                name="designInstructions"
                value={form.designInstructions}
                onChange={handleInput}
                onClick={stopProp}
                style={{ minHeight: "36px", resize: "none" }}
              />
            </div>

            {/* Visual / Design Inspiration */}
            <div className="spm-field">
              <span className="spm-label">Visual / Design Inspiration:</span>
              <div className="spm-inspiration-row">
                <UploadBox
                  label="Upload Sample"
                  value={form.inspirationSample1}
                  inputRef={sample1Ref}
                  onChange={(e) => handleFile(e, "inspirationSample1")}
                  stopProp={stopProp}
                />
                <UploadBox
                  label="Upload Sample"
                  value={form.inspirationSample2}
                  inputRef={sample2Ref}
                  onChange={(e) => handleFile(e, "inspirationSample2")}
                  stopProp={stopProp}
                />
                <UploadBox
                  label="Upload Sample"
                  value={form.inspirationSample3}
                  inputRef={sample3Ref}
                  onChange={(e) => handleFile(e, "inspirationSample3")}
                  stopProp={stopProp}
                />
              </div>
            </div>

            {/* Preference */}
            <div className="spm-cover-type-row">
              <span className="spm-cover-type-label">
                Let us know your preference:
              </span>
              {["Typographic", "AI-Generated", "Stock Image"].map((pref) => (
                <label key={pref} className="spm-radio-item" onClick={stopProp}>
                  <input
                    type="radio"
                    name="preference"
                    value={pref}
                    checked={preference === pref}
                    onChange={() => setPreference(pref)}
                  />
                  {pref}
                </label>
              ))}
            </div>

          </div>
        </div>

        {/* ============================================================
            BOTTOM ROW — Additional doc + ISBN + IMPORTANT (same line)
            ============================================================ */}
        <div className="spm-bottom-row">
          <div className="spm-field">
            <span className="spm-upload-label">Additional document:</span>
            <UploadBox
              label="Upload a file"
              value={form.additionalDocument}
              inputRef={addDocRef}
              onChange={(e) => handleFile(e, "additionalDocument")}
              stopProp={stopProp}
            />
          </div>
          <div className="spm-field">
            <span className="spm-upload-label">ISBN # / Upload Barcode:</span>
            <UploadBox
              label="Upload a file"
              value={form.isbnFile}
              inputRef={isbnFileRef}
              onChange={(e) => handleFile(e, "isbnFile")}
              stopProp={stopProp}
            />
          </div>
          <div className="spm-important-box">
            <div className="spm-important-header">
              <div className="spm-important-icon">!</div>
              <span className="spm-important-title">IMPORTANT</span>
            </div>
            <p className="spm-important-text">
              Please verify all information before submitting,<br />
              especially the trim size, page count, paper type,<br />
              bleed settings and cover format.
            </p>
          </div>
        </div>

        {/* ============================================================
            FOOTER — declaration + action buttons
            ============================================================ */}
        <div className="spm-footer">

          {/* Declaration */}
          <label className="spm-declaration-row" onClick={stopProp}>
  <input
    type="checkbox"
    checked={declared}
    onChange={(e) => setDeclared(e.target.checked)}
  />

  <span className="spm-declaration-text">
    I hereby declare that all the information submitted by me in the
    order form is correct, true, and valid.
    <br />
    Yes, I agree with the privacy policy and{" "}
    <a
      href="#terms"
      onClick={stopProp}
    >
      terms and conditions
    </a>
    .
  </span>
</label>

          {/* Buttons */}
          <div className="spm-footer-buttons">
            <button
              type="button"
              className="spm-btn-cancel"
              onClick={(e) => { stopProp(e); onClose(); }}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`spm-btn-submit ${submitted ? "success" : ""}`}
              onClick={handleSubmit}
            >
              {submitted ? "✓ ORDER SUBMITTED!" : "Submit Project"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
