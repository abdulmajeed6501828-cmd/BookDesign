import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";

// ============================================================
// PORTFOLIO BOOK COVER IMAGES
// ============================================================

// ------------------------------------------------------------
// PAGE 1
// ------------------------------------------------------------

import img01 from "../../assets/Page 1/01.jpg";
import img02 from "../../assets/Page 1/02.jpg";
import img03 from "../../assets/Page 1/03.jpg";
import img04 from "../../assets/Page 1/04.jpg";
import img05 from "../../assets/Page 1/05.jpg";
import img06 from "../../assets/Page 1/06.jpg";
import img07 from "../../assets/Page 1/07.jpg";
import img08 from "../../assets/Page 1/08.jpg";
import img09 from "../../assets/Page 1/09.jpg";

// ------------------------------------------------------------
// PAGE 2
// ------------------------------------------------------------

import img10 from "../../assets/Page 2/01.jpg";
import img11 from "../../assets/Page 2/02.jpg";
import img12 from "../../assets/Page 2/03.jpg";
import img13 from "../../assets/Page 2/04.jpg";
import img14 from "../../assets/Page 2/05.jpg";
import img15 from "../../assets/Page 2/06.jpg";
import img16 from "../../assets/Page 2/07.jpg";
import img17 from "../../assets/Page 2/08.jpg";
import img18 from "../../assets/Page 2/09.jpg";

// ------------------------------------------------------------
// PAGE 3
// ------------------------------------------------------------

import img19 from "../../assets/Page 3/01.jpg";
import img20 from "../../assets/Page 3/02.jpg";
import img21 from "../../assets/Page 3/03.jpg";
import img22 from "../../assets/Page 3/04.jpg";
import img23 from "../../assets/Page 3/05.jpg";
import img24 from "../../assets/Page 3/06.jpg";
import img25 from "../../assets/Page 3/07.jpg";
import img26 from "../../assets/Page 3/08.jpg";
import img27 from "../../assets/Page 3/09.jpg";

// ------------------------------------------------------------
// PAGE 4
// ------------------------------------------------------------

import img28 from "../../assets/Page 4/01.jpg";
import img29 from "../../assets/Page 4/02.jpg";
import img30 from "../../assets/Page 4/03.jpg";
import img31 from "../../assets/Page 4/04.jpg";
import img32 from "../../assets/Page 4/05.jpg";
import img33 from "../../assets/Page 4/06.jpg";
import img34 from "../../assets/Page 4/07.jpg";
import img35 from "../../assets/Page 4/08.jpg";
import img36 from "../../assets/Page 4/09.jpg";

// ============================================================
// PORTFOLIO SPREADS
// ============================================================

const firstSpreadLeft = [
  img01,
  img02,
  img03,
  img04,
  img05,
  img06,
  img07,
  img08,
  img09,
];

const firstSpreadRight = [
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
];

const secondSpreadLeft = [
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
  img27,
];

const secondSpreadRight = [
  img28,
  img29,
  img30,
  img31,
  img32,
  img33,
  img34,
  img35,
  img36,
];

const thirdSpreadLeft = [];
const thirdSpreadRight = [];

// ============================================================
// COVER ASPECT RATIO
// Agar aapke covers ka ratio alag ho (e.g. 1600x2560 = 5 / 8)
// to sirf yahan badal dein.
// ============================================================

const COVER_RATIO = "2 / 3";

// ============================================================
// BOOK MODAL - SIMPLIFIED COVER-ONLY VERSION
//
// <<< NEW >>> The modal now receives currentIndex + allImages and
// shows a counter ("1/36") at the top left, on the same line as
// the X button at the top right.
// ============================================================

const BookModal = ({
  selectedImage,
  currentIndex,
  allImages,
  onClose,
  onPrev,
  onNext,
}) => {
  // ==========================================================
  // LOCK BODY SCROLL
  // ==========================================================

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // ==========================================================
  // KEYBOARD NAVIGATION (ESCAPE & ARROW KEYS)
  // ==========================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        onPrev();
      } else if (event.key === "ArrowRight") {
        onNext();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-xl"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.78)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Modal responsive styles */}
      <style>{`
        @media (max-width: 500px) {
          .portfolio-modal-img {
            max-width: 88vw !important;
            max-height: 76vh !important;
          }
          .portfolio-modal-nav {
            width: 56px !important;
          }
          .portfolio-modal-nav svg {
            width: 24px !important;
            height: 24px !important;
          }
          .portfolio-modal-close {
            top: 10px !important;
            right: 10px !important;
          }
          .portfolio-modal-close svg {
            width: 24px !important;
            height: 24px !important;
          }
          .portfolio-modal-counter {
            top: 10px !important;
            left: 10px !important;
            font-size: 15px !important;
            line-height: 24px !important;
          }
        }
      `}</style>

      {/* IMAGE COUNTER - TOP LEFT (same height as the X) */}
      <div
        className="portfolio-modal-counter"
        style={{
          position: "fixed",
          top: "20px",
          left: "24px",
          zIndex: 100010,
          padding: "12px",
          color: "#ffffff",
          fontFamily:
            "'Helvetica Light', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: "20px",
          fontWeight: 300,
          letterSpacing: "1px",
          lineHeight: "32px",
          opacity: 0.9,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {currentIndex + 1}/{allImages.length}
      </div>

      {/* CLOSE BUTTON - TOP RIGHT OF THE ENTIRE SCREEN */}
      <button
        type="button"
        className="portfolio-modal-close"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close modal"
        style={{
          position: "fixed",
          top: "20px",
          right: "24px",
          zIndex: 100010,
          background: "transparent",
          border: "none",
          color: "#ffffff",
          cursor: "pointer",
          padding: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s ease, color 0.2s ease",
          opacity: 0.9,
          pointerEvents: "auto",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "scale(1.2)";
          e.currentTarget.style.color = "#c8a951";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.9";
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "#ffffff";
        }}
      >
        <FaTimes size={32} />
      </button>

      {/* PREVIOUS BUTTON - LEFT SIDE OF THE WHOLE PAGE */}
      <button
        type="button"
        className="portfolio-modal-nav"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous book"
        style={{
          position: "fixed",
          top: "80px",
          left: 0,
          bottom: 0,
          width: "90px",
          zIndex: 100000,
          background: "transparent",
          border: "none",
          color: "#ffffff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.25s ease, color 0.25s ease",
          opacity: 0.8,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
          e.currentTarget.style.color = "#c8a951";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.8";
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#ffffff";
        }}
      >
        <FaChevronLeft size={36} />
      </button>

      {/* NEXT BUTTON - RIGHT SIDE OF THE WHOLE PAGE */}
      <button
        type="button"
        className="portfolio-modal-nav"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next book"
        style={{
          position: "fixed",
          top: "80px",
          right: 0,
          bottom: 0,
          width: "90px",
          zIndex: 100000,
          background: "transparent",
          border: "none",
          color: "#ffffff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.25s ease, color 0.25s ease",
          opacity: 0.8,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
          e.currentTarget.style.color = "#c8a951";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "0.8";
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#ffffff";
        }}
      >
        <FaChevronRight size={36} />
      </button>

      {/* CENTERED COVER IMAGE */}
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          position: "relative",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "86vh",
          maxWidth: "80vw",
        }}
      >
        <img
          className="portfolio-modal-img"
          src={selectedImage}
          alt="Portfolio book cover"
          draggable="false"
          style={{
            display: "block",
            maxHeight: "82vh",
            maxWidth: "75vw",
            borderRadius: "4px",
            objectFit: "contain",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
            userSelect: "none",
          }}
        />
      </div>
    </div>,
    document.body
  );
};

// ============================================================
// PORTFOLIO COMPONENT - RESPONSIVE STYLES
//
// <<< CHANGED >>>
//   1) The outline around every cover (the soft shadow) is removed
//      on all screen sizes.
//   2) The gap between the covers is smaller on all screen sizes.
//      (Every gap value below was reduced; the covers also grow a
//      little because they now share the freed-up space.)
//   3) <<< NEW >>> "Portfolio" (left page) and "01" (right page) are
//      aligned with the outer edge of the covers. The gold line still
//      runs all the way to the spine. (See the last block of the CSS
//      below and --pf-inset in the component.)
// ============================================================

const portfolioResponsiveStyle = `
  .portfolio-page-container {
    overflow: visible !important;
    box-sizing: border-box;
    max-width: 100%;
  }

  .portfolio-cover-grid {
    grid-template-columns: repeat(3, var(--pf-cover-w, minmax(0, 1fr))) !important;
    grid-template-rows: repeat(3, minmax(0, 1fr)) !important;
    box-sizing: border-box;
    max-width: 100%;
  }

  .portfolio-book-button {
    min-height: 0;
    min-width: 0;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }

  .portfolio-book-thumb {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 1px;
    box-shadow: none;
  }

  /* Disable hover-zoom on touch devices */
  @media (hover: none) {
    .portfolio-book-thumb {
      transform: none !important;
    }
  }

  /* ==========================================================
     TABLET / LARGE PHONE RANGE (501px - 800px)
  ========================================================== */
  @media (min-width: 501px) and (max-width: 800px) {
    .portfolio-page-container {
      overflow: visible !important;
    }

    .portfolio-header {
      height: 22px !important;
    }

    .portfolio-header-title,
    .portfolio-header-number {
      letter-spacing: 0.3px !important;
    }

    .portfolio-book-thumb {
      box-shadow: none !important;
      border-radius: 2px;
    }
  }

  /* ---------- 501px - 550px ---------- */
  @media (min-width: 501px) and (max-width: 550px) {
    .portfolio-page-container {
      padding-top: 30px !important;
      padding-bottom: 30px !important;
      padding-left: 36px !important;
      padding-right: 36px !important;
    }

    .portfolio-header {
      margin-bottom: 16px !important;
    }

    .portfolio-header-title,
    .portfolio-header-number {
      font-size: 16px !important;
    }

    .portfolio-cover-grid {
      gap: 6px !important;
    }
  }

  /* ---------- 551px - 600px ---------- */
  @media (min-width: 551px) and (max-width: 600px) {
    .portfolio-page-container {
      padding-top: 34px !important;
      padding-bottom: 34px !important;
      padding-left: 42px !important;
      padding-right: 42px !important;
    }

    .portfolio-header {
      margin-bottom: 17px !important;
    }

    .portfolio-header-title,
    .portfolio-header-number {
      font-size: 17px !important;
    }

    .portfolio-cover-grid {
      gap: 7px !important;
    }
  }

  /* ---------- 601px - 650px ---------- */
  @media (min-width: 601px) and (max-width: 650px) {
    .portfolio-page-container {
      padding-top: 38px !important;
      padding-bottom: 38px !important;
      padding-left: 48px !important;
      padding-right: 48px !important;
    }

    .portfolio-header {
      margin-bottom: 18px !important;
    }

    .portfolio-header-title,
    .portfolio-header-number {
      font-size: 18px !important;
    }

    .portfolio-cover-grid {
      gap: 7px !important;
    }
  }

  /* ---------- 651px - 700px ---------- */
  @media (min-width: 651px) and (max-width: 700px) {
    .portfolio-page-container {
      padding-top: 42px !important;
      padding-bottom: 42px !important;
      padding-left: 54px !important;
      padding-right: 54px !important;
    }

    .portfolio-header {
      margin-bottom: 19px !important;
    }

    .portfolio-header-title,
    .portfolio-header-number {
      font-size: 18px !important;
    }

    .portfolio-cover-grid {
      gap: 8px !important;
    }
  }

  /* ---------- 701px - 750px ---------- */
  @media (min-width: 701px) and (max-width: 750px) {
    .portfolio-page-container {
      padding-top: 46px !important;
      padding-bottom: 46px !important;
      padding-left: 60px !important;
      padding-right: 60px !important;
    }

    .portfolio-header {
      margin-bottom: 20px !important;
    }

    .portfolio-header-title,
    .portfolio-header-number {
      font-size: 19px !important;
    }

    .portfolio-cover-grid {
      gap: 8px !important;
    }
  }

  /* ---------- 751px - 800px ---------- */
  @media (min-width: 751px) and (max-width: 800px) {
    .portfolio-page-container {
      padding-top: 50px !important;
      padding-bottom: 50px !important;
      padding-left: 66px !important;
      padding-right: 66px !important;
    }

    .portfolio-header {
      margin-bottom: 22px !important;
    }

    .portfolio-header-title,
    .portfolio-header-number {
      font-size: 20px !important;
    }

    .portfolio-cover-grid {
      gap: 9px !important;
    }
  }

  /* ==========================================================
     DESKTOP ONLY (801px and above)
  ========================================================== */
  @media (min-width: 801px) {
    .portfolio-page-container {
      --pf-pad: clamp(22px, 2.7vw, 44px);
      --pf-gap: clamp(6px, 0.9vw, 13px);
      overflow: visible !important;
      padding-top: var(--pf-pad) !important;
      padding-bottom: var(--pf-pad) !important;
      padding-left: var(--pf-pad) !important;
      padding-right: var(--pf-pad) !important;
    }

    .portfolio-header {
      height: 24px !important;
      margin-bottom: calc(var(--pf-pad) * 0.6) !important;
    }

    .portfolio-header-title,
    .portfolio-header-number {
      font-size: clamp(18px, 1.9vw, 24px) !important;
      letter-spacing: 0.3px !important;
    }

    .portfolio-header-title {
      padding-right: 12px !important;
    }

    .portfolio-header-number {
      padding-left: 12px !important;
    }

    /* LEFT PAGE: line stretches out to the spine (right edge of the page) */
    .portfolio-page-left .portfolio-header {
      width: calc(100% + var(--pf-pad)) !important;
      margin-right: calc(var(--pf-pad) * -1) !important;
    }

    /* RIGHT PAGE: line starts right at the spine (left edge of the page) */
    .portfolio-page-right .portfolio-header {
      width: calc(100% + var(--pf-pad)) !important;
      margin-left: calc(var(--pf-pad) * -1) !important;
    }

    .portfolio-cover-grid {
      gap: var(--pf-gap) !important;
    }

    .portfolio-book-button {
      overflow: visible;
    }

    .portfolio-book-thumb {
      box-shadow: none !important;
      border-radius: 2px;
    }

    .portfolio-book-thumb img {
      object-fit: contain !important;
      object-position: center;
    }
  }

  /* Very large desktop screens */
  @media (min-width: 1600px) {
    .portfolio-page-container {
      --pf-pad: 48px;
      --pf-gap: 14px;
    }
  }

  /* Short desktop screens (laptops / Nest Hub Max 1280 x 800) */
  @media (min-width: 801px) and (max-height: 840px) {
    .portfolio-page-container {
      --pf-pad: clamp(20px, 2.4vw, 32px);
      --pf-gap: clamp(6px, 0.8vw, 10px);
    }

    .portfolio-header {
      height: 22px !important;
      margin-bottom: calc(var(--pf-pad) * 0.5) !important;
    }
  }

  /* ==========================================================
     HEADER MATCHES THE TESTIMONIALS PAGE (desktop)
  ========================================================== */
  @media (min-width: 801px) {
    .portfolio-page-container {
      padding-top: calc(30px * var(--pf-s, 1.4)) !important;
    }

    .portfolio-header {
      height: calc(22px * var(--pf-s, 1.4)) !important;
      margin-bottom: calc(22px * var(--pf-s, 1.4)) !important;
    }

    .portfolio-header-title,
    .portfolio-header-number {
      font-size: calc(21px * var(--pf-s, 1.4)) !important;
      letter-spacing: calc(0.2px * var(--pf-s, 1.4)) !important;
      font-weight: 300 !important;
      line-height: 1 !important;
    }

    .portfolio-header-title {
      padding-right: calc(10px * var(--pf-s, 1.4)) !important;
    }

    .portfolio-header-number {
      padding-left: calc(10px * var(--pf-s, 1.4)) !important;
    }

    .portfolio-header-line {
      height: calc(1.5px * var(--pf-s, 1.4)) !important;
      margin-top: calc(11px * var(--pf-s, 1.4)) !important;
      background-color: #b8a47e !important;
      opacity: 1 !important;
    }
  }

  /* ==========================================================
     LARGE TABLET PORTRAIT ONLY
     (iPad Pro 13" = 1032 x 1376, iPad Pro 12.9" = 1024 x 1366)
  ========================================================== */
  @media (min-width: 801px) and (max-width: 1100px) and (min-height: 1200px) and (orientation: portrait) {
    .portfolio-page-container {
      --pf-pad: 48px;
      --pf-gap: clamp(6px, 0.9vw, 13px);
      padding-top: 52px !important;
      padding-bottom: 52px !important;
      padding-left: 48px !important;
      padding-right: 48px !important;
    }

    .portfolio-header {
      margin-bottom: 30px !important;
    }
  }

  /* ---------- PHONES (500px and below) ---------- */
  @media (max-width: 500px) {
    .portfolio-page-container {
      padding-top: 28px !important;
      padding-bottom: 28px !important;
      padding-left: 32px !important;
      padding-right: 32px !important;
      overflow: visible !important;
    }

    .portfolio-header {
      height: 20px !important;
      margin-bottom: 16px !important;
    }

    .portfolio-header-title,
    .portfolio-header-number {
      font-size: 16px !important;
      letter-spacing: 0.3px !important;
    }

    .portfolio-header-title {
      padding-right: 10px !important;
    }

    .portfolio-header-number {
      padding-left: 10px !important;
    }

    .portfolio-cover-grid {
      gap: 6px !important;
      grid-template-columns: repeat(3, var(--pf-cover-w, minmax(0, 1fr))) !important;
      grid-template-rows: repeat(3, minmax(0, 1fr)) !important;
    }

    .portfolio-book-button {
      min-height: 0;
      border-radius: 3px;
    }

    .portfolio-book-thumb {
      border-radius: 3px !important;
      box-shadow: none !important;
    }

    .portfolio-book-thumb img {
      object-fit: contain !important;
    }
  }

  /* ---------- SMALL PHONES (380px and below) ---------- */
  @media (max-width: 380px) {
    .portfolio-page-container {
      padding-top: 24px !important;
      padding-bottom: 24px !important;
      padding-left: 26px !important;
      padding-right: 26px !important;
    }

    .portfolio-header {
      margin-bottom: 14px !important;
    }

    .portfolio-header-title,
    .portfolio-header-number {
      font-size: 15px !important;
    }

    .portfolio-cover-grid {
      gap: 5px !important;
    }
  }

  /* ==========================================================
     SHOW FULL COVERS (NO TOP / BOTTOM CROP)
     Each cover keeps its natural ratio and is centered inside
     its grid cell. Placed LAST so it wins on all screen sizes.
  ========================================================== */
  .portfolio-book-button {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: visible !important;
  }

  .portfolio-book-thumb {
    width: auto !important;
    height: 100% !important;
    max-width: 100% !important;
    max-height: 100% !important;
    aspect-ratio: ${COVER_RATIO} !important;
    background: transparent !important;
  }

  .portfolio-book-thumb img {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
  }

  /* Columns are exactly as wide as the covers, centered,
     with the same gap sideways as there is between rows. */
  .portfolio-cover-grid {
    justify-content: center !important;
    column-gap: var(--pf-col-gap, 8px) !important;
  }

  /* <<< NEW >>> NO OUTLINE / SHADOW AROUND THE COVERS
     (last rule in the file, so it wins everywhere, also on hover) */
  .portfolio-book-thumb,
  .portfolio-book-button,
  .portfolio-book-thumb img {
    box-shadow: none !important;
    outline: none !important;
    border: 0 !important;
  }

  /* <<< NEW >>> "Portfolio" and "01" line up with the outer edge of the
     covers (left edge of 1st column / right edge of 3rd column).
     The gold line still runs all the way to the spine.
     --pf-inset is measured in the component from the real cover grid. */
  .portfolio-header {
    box-sizing: border-box !important;
  }

  .portfolio-page-left .portfolio-header {
    padding-left: var(--pf-inset, 0px) !important;
  }

  .portfolio-page-right .portfolio-header {
    padding-right: var(--pf-inset, 0px) !important;
  }
`;

export default function Portfolio({
  isLeft,
  spread = 1,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ==========================================================
  // MEASURE THE PAGE (same scale logic as Testimonials.jsx)
  // ==========================================================

  const pageRef = useRef(null);
  const [pageScale, setPageScale] = useState(null);

  useLayoutEffect(() => {
    const el = pageRef.current;
    if (!el) return undefined;

    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w > 0 && h > 0) {
        setPageScale(Math.min(w / 370, h / 480));
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ==========================================================
  // MEASURE GRID -> cover width (so columns hug the covers)
  // ==========================================================

  const gridRef = useRef(null);
  const [gridVars, setGridVars] = useState({});
  const [pfInset, setPfInset] = useState(0); // <<< NEW >>>

  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return undefined;

    const [rw, rh] = COVER_RATIO.split("/").map((n) => parseFloat(n));
    const ratio = rw / rh;

    const update = () => {
      const cs = window.getComputedStyle(el);
      const rowGap = parseFloat(cs.rowGap) || 0;
      const H = el.clientHeight;
      const W = el.clientWidth;
      if (H <= 0 || W <= 0) return;

      const rowH = (H - rowGap * 2) / 3;
      let coverW = rowH * ratio;
      const maxW = (W - rowGap * 2) / 3;
      if (coverW > maxW) coverW = maxW;

      setGridVars({
        "--pf-cover-w": `${Math.floor(coverW)}px`,
        "--pf-col-gap": `${rowGap}px`,
      });

      // <<< NEW >>> side space between the page edge and the covers
      const contentW = Math.floor(coverW) * 3 + rowGap * 2;
      setPfInset(Math.max(0, Math.round((W - contentW) / 2)));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ==========================================================
  // SELECT CURRENT SPREAD
  // ==========================================================

  let images = [];

  if (spread === 1) {
    images = isLeft
      ? firstSpreadLeft
      : firstSpreadRight;
  }

  if (spread === 2) {
    images = isLeft
      ? secondSpreadLeft
      : secondSpreadRight;
  }

  if (spread === 3) {
    images = isLeft
      ? thirdSpreadLeft
      : thirdSpreadRight;
  }

  // ==========================================================
  // ALL PORTFOLIO IMAGES
  // ==========================================================

  const allImages = [
    ...firstSpreadLeft,
    ...firstSpreadRight,
    ...secondSpreadLeft,
    ...secondSpreadRight,
    ...thirdSpreadLeft,
    ...thirdSpreadRight,
  ];

  // ==========================================================
  // OPEN MODAL
  // ==========================================================

  const handleImageClick = (event, image) => {
    event.stopPropagation();

    if (event.nativeEvent?.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation();
    }

    const index = allImages.findIndex(
      (item) => item === image
    );

    setCurrentIndex(index >= 0 ? index : 0);
    setSelectedImage(image);
  };

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // ==========================================================
  // PREVIOUS
  // ==========================================================

  const handlePrev = () => {
    if (!allImages.length) return;

    const newIndex =
      currentIndex > 0
        ? currentIndex - 1
        : allImages.length - 1;

    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  // ==========================================================
  // NEXT
  // ==========================================================

  const handleNext = () => {
    if (!allImages.length) return;

    const newIndex =
      currentIndex < allImages.length - 1
        ? currentIndex + 1
        : 0;

    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  // ==========================================================
  // GET PAGE NUMBER
  // ==========================================================

  const getPageNumber = () => {
    // Right side pages only (when isLeft is false)
    if (!isLeft) {
      if (spread === 1) return "01";
      if (spread === 2) return "02";
      if (spread === 3) return "03";
    }
    return "";
  };

  // ==========================================================
  // PORTFOLIO PAGE SPREAD
  // ==========================================================

  const FONT = "'Helvetica Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif";

  return (
    <>
      <style>{portfolioResponsiveStyle}</style>
      <div
        ref={pageRef}
        className={`portfolio-page-container ${
          isLeft ? "portfolio-page-left" : "portfolio-page-right"
        }`}
        style={{
          ...(pageScale ? { "--pf-s": pageScale } : {}),
          "--pf-inset": `${pfInset}px`, // <<< NEW >>>
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
          paddingTop: "clamp(8px, 1.4vh, 14px)",
          paddingBottom: "clamp(8px, 1.4vh, 14px)",
          paddingLeft: isLeft ? "clamp(14px, 2.8vw, 28px)" : "clamp(6px, 1vw, 10px)",
          paddingRight: isLeft ? "clamp(6px, 1vw, 10px)" : "clamp(14px, 2.8vw, 28px)",
        }}
      >
        {/* ====================================================
            HEADER WITH CONTINUOUS GOLD LINE ACROSS SPREAD
        ==================================================== */}

        {isLeft ? (
          <div
            className="portfolio-header"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: "clamp(6px, 1.1vh, 11px)",
              height: "22px",
              flexShrink: 0,
            }}
          >
            <h2
              className="portfolio-header-title"
              style={{
                fontFamily: FONT,
                fontSize: "clamp(16px, 2.1vh, 20px)",
                fontWeight: 300,
                color: "#211912",
                margin: 0,
                paddingRight: "10px",
                letterSpacing: "0.3px",
                lineHeight: 1,
              }}
            >
              Portfolio
            </h2>
            <div
              className="portfolio-header-line"
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#b8a47e",
                opacity: 0.7,
              }}
            />
          </div>
        ) : (
          <div
            className="portfolio-header"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              marginBottom: "clamp(6px, 1.1vh, 11px)",
              height: "22px",
              flexShrink: 0,
            }}
          >
            <div
              className="portfolio-header-line"
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#b8a47e",
                opacity: 0.7,
              }}
            />
            <span
              className="portfolio-header-number"
              style={{
                fontFamily: FONT,
                fontSize: "clamp(16px, 2.1vh, 20px)",
                fontWeight: 300,
                color: "#211912",
                margin: 0,
                paddingLeft: "10px",
                letterSpacing: "0.3px",
                lineHeight: 1,
              }}
            >
              {getPageNumber()}
            </span>
          </div>
        )}

        {/* ====================================================
            3x3 BOOK COVERS GRID
        ==================================================== */}

        <div
          ref={gridRef}
          className="portfolio-cover-grid"
          style={{
            ...gridVars,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gridTemplateRows: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(3px, 0.5vh, 5px) clamp(3px, 0.4vw, 5px)",
            flex: 1,
            minHeight: 0,
            width: "100%",
            alignItems: "stretch",
            justifyItems: "stretch",
          }}
        >
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className="portfolio-book-button"
              onPointerDown={(event) => event.stopPropagation()}
              onMouseDown={(event) => event.stopPropagation()}
              onTouchStart={(event) => event.stopPropagation()}
              onClick={(event) => handleImageClick(event, image)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
                outline: "none",
                minHeight: 0,
                overflow: "visible",
              }}
            >
              <div
                className="portfolio-book-thumb"
                style={{
                  height: "100%",
                  maxWidth: "100%",
                  aspectRatio: COVER_RATIO,
                  overflow: "hidden",
                  borderRadius: "1px",
                  boxShadow: "none",
                  transition: "transform 0.22s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <img
                  src={image}
                  alt="Portfolio book cover"
                  draggable="false"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    userSelect: "none",
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================
          MODAL
      ====================================================== */}

      {selectedImage && (
        <BookModal
          selectedImage={selectedImage}
          currentIndex={currentIndex}
          allImages={allImages}
          onClose={handleCloseModal}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
}