import React, { useState, useRef } from "react";
import "./About.css";

export default function About({ isLeft }) {
  // Package selection
  const [selectedPackage, setSelectedPackage] = useState("starter");
  // Cover type selection
  const [coverType, setCoverType] = useState("Paperback");
  // Design preference selection
  const [preference, setPreference] = useState("Typographic");
  // Declaration checkbox
  const [declared, setDeclared] = useState(false);

  // Form input states
  const [formData, setFormData] = useState({
    clientName: "",
    emailAddress: "",
    bookTitle: "",
    subtitle: "",
    secondSubtitle: "",
    authorName: "",
    authorPhoto: null,
    bookDescription: "",
    authorBio: "",
    additionalDocument: null,
    trimSize: "",
    pageCount: "",
    paperType: "White/Cream",
    spineWidth: "",
    pdfTemplate: null,
    designInstructions: "",
    inspirationSample1: null,
    inspirationSample2: null,
    inspirationSample3: null,
    isbnCode: "",
    isbnFile: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hidden file input refs
  const authorPhotoRef = useRef(null);
  const addDocRef = useRef(null);
  const pdfTemplateRef = useRef(null);
  const sample1Ref = useRef(null);
  const sample2Ref = useRef(null);
  const sample3Ref = useRef(null);
  const isbnFileRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file.name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  // Block all pointer/keyboard events from bubbling to book flip controller
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
     LEFT PAGE — START A PROJECT / PROJECT DETAILS
  ============================================================ */
  if (isLeft) {
    return (
      <div className="ab-page ab-page-left" {...sp} style={{ fontFamily: "Helvetica Light" }}>
        {/* Header — "start a project" */}
        <h2 className="ab-title" style={{ fontFamily: "Helvetica Light" }}>start a project</h2>

        {/* Section Divider with Gold Lines */}
        <div className="ab-divider">
          <span className="ab-divider-line"></span>
          <span className="ab-divider-text" style={{ fontFamily: "Helvetica Light" }}>PROJECT DETAILS</span>
          <span className="ab-divider-line"></span>
        </div>

        {/* Radio Row — Packages */}
        <div className="ab-radio-group">
          {[
            { id: "starter", label: "starter $150" },
            { id: "basic", label: "basic $200" },
            { id: "premium", label: "premium $350" },
            { id: "business", label: "business $500" },
          ].map((pkg) => (
            <label key={pkg.id} className="ab-radio-item" {...sp} style={{ fontFamily: "Helvetica Light" }}>
              <input
                type="radio"
                name="package"
                value={pkg.id}
                checked={selectedPackage === pkg.id}
                onChange={() => setSelectedPackage(pkg.id)}
                className="ab-radio"
                {...sp}
              />
              <span className="ab-radio-label" style={{ fontFamily: "Helvetica Light" }}>{pkg.label}</span>
            </label>
          ))}
        </div>

        {/* Form Fields Container — Labels sit INSIDE fields as placeholders */}
        <div className="ab-form-grid">

          {/* Row 1: Client Name & Email */}
          <div className="ab-row-2col">
            <input
              type="text"
              name="clientName"
              placeholder="Client Name:"
              value={formData.clientName}
              onChange={handleInputChange}
              className="ab-input"
              {...sp}
              style={{ fontFamily: "Helvetica Light" }}
            />
            <input
              type="email"
              name="emailAddress"
              placeholder="Email Address:"
              value={formData.emailAddress}
              onChange={handleInputChange}
              className="ab-input"
              {...sp}
              style={{ fontFamily: "Helvetica Light" }}
            />
          </div>

          {/* Row 2: Book Title */}
          <input
            type="text"
            name="bookTitle"
            placeholder="Book Title:"
            value={formData.bookTitle}
            onChange={handleInputChange}
            className="ab-input"
            {...sp}
            style={{ fontFamily: "Helvetica Light" }}
          />

          {/* Row 3: Subtitle */}
          <input
            type="text"
            name="subtitle"
            placeholder="Subtitle:"
            value={formData.subtitle}
            onChange={handleInputChange}
            className="ab-input"
            {...sp}
            style={{ fontFamily: "Helvetica Light" }}
          />

          {/* Row 4: Second subtitle (optional) */}
          <input
            type="text"
            name="secondSubtitle"
            placeholder="Second subtitle (optional):"
            value={formData.secondSubtitle}
            onChange={handleInputChange}
            className="ab-input"
            {...sp}
            style={{ fontFamily: "Helvetica Light" }}
          />

          {/* Row 5: Author name & Author Photo upload */}
          <div className="ab-row-2col ab-align-center">
            <input
              type="text"
              name="authorName"
              placeholder="Author name:"
              value={formData.authorName}
              onChange={handleInputChange}
              className="ab-input"
              {...sp}
              style={{ fontFamily: "Helvetica Light" }}
            />
            <div className="ab-author-photo-group">
              <span className="ab-inline-label" style={{ fontFamily: "Helvetica Light" }}>Author Photo:</span>
              <div className="ab-upload-box" onClick={() => authorPhotoRef.current?.click()} {...sp}>
                <span className="ab-upload-text" style={{ fontFamily: "Helvetica Light" }}>
                  {formData.authorPhoto ? formData.authorPhoto : (
                    <>
                      <svg className="ab-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      Upload a file
                    </>
                  )}
                </span>
                <input
                  type="file"
                  ref={authorPhotoRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, "authorPhoto")}
                />
              </div>
            </div>
          </div>

          {/* Row 6: Side-by-Side Textareas (Labels inside as placeholders) */}
          <div className="ab-row-2col ab-row-textareas">
            <textarea
              name="bookDescription"
              placeholder="Book description: (for back cover)"
              value={formData.bookDescription}
              onChange={handleInputChange}
              className="ab-textarea"
              {...sp}
              style={{ fontFamily: "Helvetica Light" }}
            />
            <textarea
              name="authorBio"
              placeholder="Author Bio: (for back cover)"
              value={formData.authorBio}
              onChange={handleInputChange}
              className="ab-textarea"
              {...sp}
              style={{ fontFamily: "Helvetica Light" }}
            />
          </div>

          {/* Row 7: Additional document upload block */}
          <div className="ab-add-doc-container">
            <span className="ab-add-doc-label" style={{ fontFamily: "Helvetica Light" }}>Additional document:</span>
            <div className="ab-upload-box ab-upload-full" onClick={() => addDocRef.current?.click()} {...sp}>
              <span className="ab-upload-text" style={{ fontFamily: "Helvetica Light" }}>
                {formData.additionalDocument ? formData.additionalDocument : (
                  <>
                    <svg className="ab-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    Upload a file
                  </>
                )}
              </span>
              <input
                type="file"
                ref={addDocRef}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, "additionalDocument")}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }

  /* ============================================================
     RIGHT PAGE — IMPORTANT NOTICE & SPECIFICATIONS
  ============================================================ */
  return (
    <div className="ab-page ab-page-right" {...sp} style={{ fontFamily: "Helvetica Light" }}>
      {/* Important Callout Banner */}
      <div className="ab-important-box">
        <div className="ab-important-header">
          <div className="ab-important-icon" style={{ fontFamily: "Helvetica Light" }}>!</div>
          <span className="ab-important-title" style={{ fontFamily: "Helvetica Light" }}>IMPORTANT</span>
        </div>
        <p className="ab-important-text" style={{ fontFamily: "Helvetica Light" }}>
          Please verify all information before submitting—especially the trim size, page count, paper type, bleed settings and cover format. Incorrect specifications can affect the spine width and overall cover dimensions. For print covers, please upload the final template supplied by your publishing platform.
        </p>
      </div>

      {/* Book Cover Type Radio Group */}
      <div className="ab-cover-type-row">
        <span className="ab-label ab-label-inline" style={{ fontFamily: "Helvetica Light" }}>Book Cover Type:</span>
        {["Ebook", "Paperback", "Hardcover", "Jacket Cover"].map((type) => (
          <label key={type} className="ab-radio-item" {...sp} style={{ fontFamily: "Helvetica Light" }}>
            <input
              type="radio"
              name="coverType"
              value={type}
              checked={coverType === type}
              onChange={() => setCoverType(type)}
              className="ab-radio"
              {...sp}
            />
            <span className="ab-radio-label" style={{ fontFamily: "Helvetica Light" }}>{type}</span>
          </label>
        ))}
      </div>

      {/* 4 Specifications Grid — Labels inside / above compact */}
      <div className="ab-specs-grid">
        <div className="ab-field-group">
          <label className="ab-label" style={{ fontFamily: "Helvetica Light" }}>Trim Size:</label>
          <input
            type="text"
            name="trimSize"
            placeholder="i.e. 6x9"
            value={formData.trimSize}
            onChange={handleInputChange}
            className="ab-input"
            {...sp}
            style={{ fontFamily: "Helvetica Light" }}
          />
        </div>

        <div className="ab-field-group">
          <label className="ab-label" style={{ fontFamily: "Helvetica Light" }}>Page Count:</label>
          <input
            type="text"
            name="pageCount"
            value={formData.pageCount}
            onChange={handleInputChange}
            className="ab-input"
            {...sp}
            style={{ fontFamily: "Helvetica Light" }}
          />
        </div>

        <div className="ab-field-group">
          <label className="ab-label" style={{ fontFamily: "Helvetica Light" }}>Paper Type:</label>
          <select
            name="paperType"
            value={formData.paperType}
            onChange={handleInputChange}
            className="ab-input ab-select"
            {...sp}
            style={{ fontFamily: "Helvetica Light" }}
          >
            <option value="White/Cream">White/Cream</option>
            <option value="White">White</option>
            <option value="Cream">Cream</option>
            <option value="Color">Standard Color</option>
          </select>
        </div>

        <div className="ab-field-group">
          <label className="ab-label" style={{ fontFamily: "Helvetica Light" }}>Spine Width:</label>
          <input
            type="text"
            name="spineWidth"
            placeholder="i.e. 0.250 in"
            value={formData.spineWidth}
            onChange={handleInputChange}
            className="ab-input"
            {...sp}
            style={{ fontFamily: "Helvetica Light" }}
          />
        </div>
      </div>

      {/* Print Cover Template Upload */}
      <div className="ab-field-group">
        <label className="ab-label" style={{ fontFamily: "Helvetica Light" }}>Print Cover Template (for Paperback/Hardcover):</label>
        <div className="ab-upload-box ab-upload-full" onClick={() => pdfTemplateRef.current?.click()} {...sp}>
          <span className="ab-upload-text" style={{ fontFamily: "Helvetica Light" }}>
            {formData.pdfTemplate ? formData.pdfTemplate : (
              <>
                <svg className="ab-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload PDF Template
              </>
            )}
          </span>
          <input
            type="file"
            accept=".pdf"
            ref={pdfTemplateRef}
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, "pdfTemplate")}
          />
        </div>
      </div>

      {/* KDP Calculator Note */}
      <p className="ab-kdp-note" style={{ fontFamily: "Helvetica Light" }}>
        To find out the exact dimensions of your cover, visit Amazon KDP Cover Calculator:{" "}
        <a
          href="https://kdp.amazon.com/cover-calculator"
          target="_blank"
          rel="noreferrer"
          className="ab-kdp-link"
          {...sp}
          style={{ fontFamily: "Helvetica Light" }}
        >
          https://kdp.amazon.com/cover-calculator
        </a>{" "}
        and upload the PDF template.
      </p>

      {/* Design Needs / Instructions */}
      <div className="ab-field-group">
        <label className="ab-label" style={{ fontFamily: "Helvetica Light" }}>Design Needs / Instructions:</label>
        <textarea
          name="designInstructions"
          value={formData.designInstructions}
          onChange={handleInputChange}
          className="ab-textarea ab-textarea-short"
          {...sp}
          style={{ fontFamily: "Helvetica Light" }}
        />
      </div>

      {/* Visual / Design Inspiration (3 upload buttons) */}
      <div className="ab-field-group">
        <label className="ab-label" style={{ fontFamily: "Helvetica Light" }}>Visual / Design Inspiration:</label>
        <div className="ab-inspiration-row">
          <div className="ab-upload-box" onClick={() => sample1Ref.current?.click()} {...sp}>
            <span className="ab-upload-text" style={{ fontFamily: "Helvetica Light" }}>
              {formData.inspirationSample1 ? formData.inspirationSample1 : (
                <>
                  <svg className="ab-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload Sample
                </>
              )}
            </span>
            <input type="file" ref={sample1Ref} style={{ display: "none" }} onChange={(e) => handleFileChange(e, "inspirationSample1")} />
          </div>

          <div className="ab-upload-box" onClick={() => sample2Ref.current?.click()} {...sp}>
            <span className="ab-upload-text" style={{ fontFamily: "Helvetica Light" }}>
              {formData.inspirationSample2 ? formData.inspirationSample2 : (
                <>
                  <svg className="ab-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload Sample
                </>
              )}
            </span>
            <input type="file" ref={sample2Ref} style={{ display: "none" }} onChange={(e) => handleFileChange(e, "inspirationSample2")} />
          </div>

          <div className="ab-upload-box" onClick={() => sample3Ref.current?.click()} {...sp}>
            <span className="ab-upload-text" style={{ fontFamily: "Helvetica Light" }}>
              {formData.inspirationSample3 ? formData.inspirationSample3 : (
                <>
                  <svg className="ab-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload Sample
                </>
              )}
            </span>
            <input type="file" ref={sample3Ref} style={{ display: "none" }} onChange={(e) => handleFileChange(e, "inspirationSample3")} />
          </div>
        </div>
      </div>

      {/* Preference Radio Row */}
      <div className="ab-pref-row">
        <span className="ab-label ab-label-inline" style={{ fontFamily: "Helvetica Light" }}>Let us know your preference:</span>
        {["Typographic", "AI-Generated", "Stock Image"].map((pref) => (
          <label key={pref} className="ab-radio-item" {...sp} style={{ fontFamily: "Helvetica Light" }}>
            <input
              type="radio"
              name="preference"
              value={pref}
              checked={preference === pref}
              onChange={() => setPreference(pref)}
              className="ab-radio"
              {...sp}
            />
            <span className="ab-radio-label" style={{ fontFamily: "Helvetica Light" }}>{pref}</span>
          </label>
        ))}
      </div>

      {/* ISBN # or Barcode Code Row */}
      <div className="ab-isbn-row">
        <span className="ab-label ab-label-inline" style={{ fontFamily: "Helvetica Light" }}>ISBN # or Barcode Code:</span>
        <input
          type="text"
          name="isbnCode"
          placeholder="000-0-00-000000-0"
          value={formData.isbnCode}
          onChange={handleInputChange}
          className="ab-input ab-isbn-input"
          {...sp}
          style={{ fontFamily: "Helvetica Light" }}
        />
        <div className="ab-upload-box ab-upload-btn-only" onClick={() => isbnFileRef.current?.click()} {...sp}>
          <span className="ab-upload-text" style={{ fontFamily: "Helvetica Light" }}>
            {formData.isbnFile ? formData.isbnFile : (
              <>
                <svg className="ab-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload file
              </>
            )}
          </span>
          <input type="file" ref={isbnFileRef} style={{ display: "none" }} onChange={(e) => handleFileChange(e, "isbnFile")} />
        </div>
      </div>

      {/* Declaration Checkbox */}
      <label className="ab-declaration-row" {...sp} style={{ fontFamily: "Helvetica Light" }}>
        <input
          type="checkbox"
          checked={declared}
          onChange={(e) => setDeclared(e.target.checked)}
          className="ab-checkbox"
          {...sp}
        />
        <span className="ab-declaration-label" style={{ fontFamily: "Helvetica Light" }}>
          I hereby declare that all the information submitted by me in the order form is correct, true, and valid. Yes, I agree with the privacy policy and terms and conditions.
        </span>
      </label>

      {/* Submit Button */}
      <div className="ab-submit-wrap">
        {isSubmitted ? (
          <div className="ab-submit-success" style={{ fontFamily: "Helvetica Light" }}>✓ ORDER SUBMITTED SUCCESSFULLY!</div>
        ) : (
          <button type="button" onClick={handleSubmit} className="ab-submit-btn" {...sp} style={{ fontFamily: "Helvetica Light" }}>
            SUBMIT ORDER
          </button>
        )}
      </div>
    </div>
  );
}