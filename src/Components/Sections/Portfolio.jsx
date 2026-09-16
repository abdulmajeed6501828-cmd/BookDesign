import React, { useEffect, useState } from "react";
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

// ============================================================
// BOOK MODAL - SIMPLIFIED COVER-ONLY VERSION
// ============================================================

const BookModal = ({
  selectedImage,
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
      {/* CLOSE BUTTON - TOP RIGHT OF THE ENTIRE SCREEN */}
      <button
        type="button"
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
// PORTFOLIO COMPONENT
// ============================================================

const portfolioResponsiveStyle = `
  .portfolio-page-container {
    overflow: visible !important;
  }

  .portfolio-cover-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    grid-template-rows: repeat(3, minmax(0, 1fr)) !important;
  }

  .portfolio-book-button {
    min-height: 0;
    overflow: hidden;
  }

  .portfolio-book-thumb {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 1px;
    box-shadow: 2px 4px 9px rgba(0, 0, 0, 0.22);
  }

  @media (max-width: 767px) {
    .portfolio-page-container {
      padding-top: 8px !important;
      padding-bottom: 8px !important;
      padding-left: 10px !important;
      padding-right: 10px !important;
      overflow: visible !important;
    }

    .portfolio-cover-grid {
      gap: clamp(4px, 1.3vw, 7px) !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      grid-template-rows: repeat(3, minmax(0, 1fr)) !important;
    }

    .portfolio-book-thumb {
      box-shadow: none !important;
      border-radius: 2px;
    }
  }

  @media (max-width: 480px) {
    .portfolio-page-container {
      padding-top: 6px !important;
      padding-bottom: 6px !important;
      padding-left: 6px !important;
      padding-right: 6px !important;
      overflow: visible !important;
    }

    .portfolio-cover-grid {
      gap: 3px !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      grid-template-rows: repeat(3, minmax(0, 1fr)) !important;
    }

    .portfolio-book-button {
      min-height: 0;
    }

    .portfolio-book-thumb img {
      object-fit: cover;
    }
  }
`;

export default function Portfolio({
  isLeft,
  spread = 1,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        className="portfolio-page-container"
        style={{
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
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#b8a47e",
                opacity: 0.7,
              }}
            />
            <span
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
          className="portfolio-cover-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gridTemplateRows: "repeat(3, minmax(0, 1fr))",
            gap: "clamp(4px, 0.8vh, 8px) clamp(4px, 0.6vw, 8px)",
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
                display: "block",
                width: "100%",
                height: "100%",
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
                outline: "none",
                minHeight: 0,
                overflow: "hidden",
              }}
            >
              <div
                className="portfolio-book-thumb"
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: "1px",
                  boxShadow: "2px 4px 9px rgba(0, 0, 0, 0.22)",
                  transition: "transform 0.22s ease, box-shadow 0.22s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "4px 8px 18px rgba(0, 0, 0, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "2px 4px 9px rgba(0, 0, 0, 0.22)";
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
                    objectFit: "fill",
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