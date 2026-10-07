import React, { useState, useRef, useEffect, useCallback } from "react";
import logoImg from "../../assets/AAFI-Logo.png";
import { useApi } from "../../context/apiClient";
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

const UploadBox = ({ label, subLabel, value, inputRef, onChange, accept, stopProp }) => (
  <div className="spm-upload-col">
    {label && <span className="spm-upload-field-label">{label}</span>}
    {subLabel && <span className="spm-upload-field-sublabel">{subLabel}</span>}
    <div
      className="spm-upload-box"
      onClick={(e) => {
        stopProp(e);
        inputRef?.current?.click();
      }}
    >
      <UploadIcon />
      <span>{value?.name || "Upload a file"}</span>
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
  </div>
);

/* ================================================================
   SECTION HEADER (gold bar)
   ================================================================ */

const SectionHeader = ({ number, title }) => (
  <div className="spm-section-bar">
    {number && <span className="spm-section-num">{number}.</span>}
    <span className="spm-section-title">{title}</span>
  </div>
);

/* ================================================================
   MAIN MODAL COMPONENT
   ================================================================ */

export default function StartProjectModal({ isOpen, onClose }) {
  const { submitOrder } = useApi();

  /* ----------------------------------------------------------------
     FORM DATA STATE
     ---------------------------------------------------------------- */
  const [declared, setDeclared] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({
    clientName: "",
    emailAddress: "",
    bookTitle: "",
    wordCount: "",
    subtitle: "",
    bookSize: "",
    authorName: "",
    bookDescription: "",
    authorBio: "",
    colorsToExplore: "",
    designNeeds: "",
    symbolsImagery: "",
    toneOrMood: "",
    preferredStyle: "",
    otherDetails: "",
  });

  /* ----------------------------------------------------------------
     FILE INPUT REFS
     ---------------------------------------------------------------- */
  const authorHeadshotRef = useRef(null);
  const sampleCover1Ref = useRef(null);
  const sampleCover2Ref = useRef(null);
  const sampleCover3Ref = useRef(null);
  const printCoverRef = useRef(null);
  const additionalDocRef = useRef(null);
  const isbnFileRef = useRef(null);

  const [files, setFiles] = useState({
    authorHeadshot: null,
    sampleCover1: null,
    sampleCover2: null,
    sampleCover3: null,
    printCoverTemplate: null,
    additionalDocument: null,
    isbnFile: null,
  });

  /* ----------------------------------------------------------------
     EVENT PROPAGATION BLOCKER
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
    if (file) setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e) => {
    stopProp(e);
    if (isSubmitting) return;
    setSubmitError("");
    setIsSubmitting(true);
    try {
      await submitOrder({ form, files });
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); onClose(); }, 2800);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ----------------------------------------------------------------
     EARLY RETURN IF CLOSED
     ---------------------------------------------------------------- */
  if (!isOpen) return null;

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
          </div>

          {/* Title */}
          <div className="spm-header-center">
            <h2 className="spm-header-title">Requirements Form</h2>
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
            SCROLLABLE BODY
            ============================================================ */}
        <div className="spm-body">

          {/* ── CLIENT DETAILS ── */}
          <SectionHeader title="CLIENT DETAILS" />
          <div className="spm-form-block">
            <div className="spm-two-col">
              <div className="spm-field">
                <label className="spm-field-label">Client Name:</label>
                <input
                  className="spm-input"
                  type="text"
                  name="clientName"
                  value={form.clientName}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
              <div className="spm-field">
                <label className="spm-field-label">Email Address:</label>
                <input
                  className="spm-input"
                  type="email"
                  name="emailAddress"
                  value={form.emailAddress}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
            </div>
          </div>

          {/* ── 1. BOOK INFORMATION ── */}
          <SectionHeader number="1" title="BOOK INFORMATION" />
          <div className="spm-form-block">
            <div className="spm-two-col">
              <div className="spm-field">
                <label className="spm-field-label">Book Title:</label>
                <input
                  className="spm-input"
                  type="text"
                  name="bookTitle"
                  value={form.bookTitle}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
              <div className="spm-field">
                <label className="spm-field-label">Word Count (formatted):</label>
                <input
                  className="spm-input"
                  type="text"
                  name="wordCount"
                  value={form.wordCount}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
            </div>

            <div className="spm-two-col">
              <div className="spm-field">
                <label className="spm-field-label">Subtitle:</label>
                <input
                  className="spm-input"
                  type="text"
                  name="subtitle"
                  value={form.subtitle}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
              <div className="spm-field">
                <label className="spm-field-label">Book Size:</label>
                <input
                  className="spm-input"
                  type="text"
                  name="bookSize"
                  placeholder="e.g. 5.5 x 8.5 in"
                  value={form.bookSize}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
            </div>

            <div className="spm-field">
              <label className="spm-field-label">Author Name:</label>
              <input
                className="spm-input"
                type="text"
                name="authorName"
                value={form.authorName}
                onChange={handleInput}
                onClick={stopProp}
              />
              <span className="spm-field-note">Enter exactly as it should appear on the cover.</span>
            </div>
          </div>

          {/* ── 2. BACK-COVER MATERIALS ── */}
          <SectionHeader number="2" title="BACK-COVER MATERIALS" />
          <div className="spm-form-block">
            <div className="spm-field">
              <label className="spm-field-label">
                Book Description: <span className="spm-field-sublabel">Copy for the back cover.</span>
              </label>
              <textarea
                className="spm-textarea"
                name="bookDescription"
                value={form.bookDescription}
                onChange={handleInput}
                onClick={stopProp}
              />
            </div>

            <div className="spm-field">
              <label className="spm-field-label">
                Author Bio: <span className="spm-field-sublabel">Copy for the back cover.</span>
              </label>
              <textarea
                className="spm-textarea"
                name="authorBio"
                value={form.authorBio}
                onChange={handleInput}
                onClick={stopProp}
              />
            </div>
          </div>

          {/* ── 3. FILES TO PROVIDE ── */}
          <SectionHeader number="3" title="FILES TO PROVIDE" />
          <div className="spm-form-block">
            <div className="spm-three-col">
              <UploadBox
                label="Author Headshot:"
                subLabel="High-resolution JPG or PNG preferred."
                value={files.authorHeadshot}
                inputRef={authorHeadshotRef}
                onChange={(e) => handleFile(e, "authorHeadshot")}
                stopProp={stopProp}
              />
              <UploadBox
                label="Sample Cover 1:"
                subLabel="A cover whose style or mood you like."
                value={files.sampleCover1}
                inputRef={sampleCover1Ref}
                onChange={(e) => handleFile(e, "sampleCover1")}
                stopProp={stopProp}
              />
              <UploadBox
                label="Sample Cover 2:"
                subLabel="A second visual reference."
                value={files.sampleCover2}
                inputRef={sampleCover2Ref}
                onChange={(e) => handleFile(e, "sampleCover2")}
                stopProp={stopProp}
              />
            </div>

            <div className="spm-three-col">
              <UploadBox
                label="Sample Cover 3:"
                subLabel="Optional third visual reference."
                value={files.sampleCover3}
                inputRef={sampleCover3Ref}
                onChange={(e) => handleFile(e, "sampleCover3")}
                stopProp={stopProp}
              />
              <UploadBox
                label="Print Cover Template:"
                subLabel="Upload your PDF template."
                value={files.printCoverTemplate}
                inputRef={printCoverRef}
                accept=".pdf"
                onChange={(e) => handleFile(e, "printCoverTemplate")}
                stopProp={stopProp}
              />
              <UploadBox
                label="Additional Document:"
                subLabel="e.g. manuscript, notes, or reference files."
                value={files.additionalDocument}
                inputRef={additionalDocRef}
                onChange={(e) => handleFile(e, "additionalDocument")}
                stopProp={stopProp}
              />
            </div>

            <div className="spm-field">
              <label className="spm-field-label">ISBN # / Upload Barcode:</label>
              <div
                className="spm-upload-box spm-upload-box--full"
                onClick={(e) => { stopProp(e); isbnFileRef.current?.click(); }}
              >
                <UploadIcon />
                <span>{files.isbnFile?.name || "Upload a file"}</span>
                <input
                  type="file"
                  ref={isbnFileRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleFile(e, "isbnFile")}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>

          {/* ── 4. CREATIVE DIRECTION ── */}
          <SectionHeader number="4" title="CREATIVE DIRECTION" />
          <div className="spm-form-block">
            <div className="spm-two-col">
              <div className="spm-field">
                <label className="spm-field-label">
                  Colors to Explore: <span className="spm-field-sublabel">HEX values are welcome, e.g., #EB5B54</span>
                </label>
                <input
                  className="spm-input"
                  type="text"
                  name="colorsToExplore"
                  value={form.colorsToExplore}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
              <div className="spm-field">
                <label className="spm-field-label">Design Needs / Instructions:</label>
                <input
                  className="spm-input"
                  type="text"
                  name="designNeeds"
                  value={form.designNeeds}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
            </div>

            <div className="spm-field">
              <label className="spm-field-label">
                Symbols, Imagery, or Illustrations: <span className="spm-field-sublabel">What do you envision for the cover?</span>
              </label>
              <input
                className="spm-input"
                type="text"
                name="symbolsImagery"
                value={form.symbolsImagery}
                onChange={handleInput}
                onClick={stopProp}
              />
            </div>

            <div className="spm-two-col">
              <div className="spm-field">
                <label className="spm-field-label">
                  Tone or Mood: <span className="spm-field-sublabel">Examples: suspenseful, uplifting, nostalgic</span>
                </label>
                <input
                  className="spm-input"
                  type="text"
                  name="toneOrMood"
                  value={form.toneOrMood}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
              <div className="spm-field">
                <label className="spm-field-label">
                  Preferred Style: <span className="spm-field-sublabel">Examples: minimal, vibrant, classic</span>
                </label>
                <input
                  className="spm-input"
                  type="text"
                  name="preferredStyle"
                  value={form.preferredStyle}
                  onChange={handleInput}
                  onClick={stopProp}
                />
              </div>
            </div>

            <div className="spm-field">
              <label className="spm-field-label">Other Details, Themes, or Ideas:</label>
              <input
                className="spm-input"
                type="text"
                name="otherDetails"
                value={form.otherDetails}
                onChange={handleInput}
                onClick={stopProp}
              />
            </div>
          </div>

          {/* ── 5. AUTHOR APPROVAL ── */}
          <SectionHeader number="5" title="AUTHOR APPROVAL" />
          <div className="spm-form-block">
            <div className="spm-warning-box">
              <span className="spm-warning-icon">⚠</span>
              <p className="spm-warning-text">
                Please verify all information before submitting, especially the trim size, page count, paper type, bleed settings, cover format, and uploaded files.
              </p>
            </div>
          </div>

        </div>{/* end spm-body */}

        {/* ============================================================
            FOOTER — declaration + action buttons
            ============================================================ */}
        <div className="spm-footer">
          <label className="spm-declaration-row" onClick={stopProp}>
            <input
              type="checkbox"
              checked={declared}
              onChange={(e) => setDeclared(e.target.checked)}
            />
            <span className="spm-declaration-text">
              I hereby declare that all the information submitted by me in the order form is correct, true, and valid.
              <br />
              Yes, I agree with the{" "}
              <a href="#privacy" onClick={stopProp}>privacy policy</a>
              {" "}and{" "}
              <a href="#terms" onClick={stopProp}>terms and conditions</a>.
            </span>
          </label>

          {submitError && <p className="spm-error-msg" role="alert">{submitError}</p>}

          <div className="spm-footer-buttons">
            <button
              type="button"
              className="spm-btn-cancel"
              onClick={(e) => { stopProp(e); onClose(); }}
            >
              CANCEL
            </button>
            <button
              type="button"
              className={`spm-btn-submit ${submitted ? "success" : ""}`}
              onClick={handleSubmit}
              disabled={isSubmitting || submitted}
            >
              {submitted ? "✓ ORDER SUBMITTED!" : isSubmitting ? "Submitting..." : "SUBMIT PROJECT"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
