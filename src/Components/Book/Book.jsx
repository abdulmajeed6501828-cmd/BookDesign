import React, { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

import BookPage from "./BookPage";

import Home from "../Sections/Home";
import Portfolio from "../Sections/Portfolio";
import About from "../Sections/About";
import Pricing from "../Sections/Pricing";
import Contact from "../Sections/Contact";

import coverImg from "../../assets/cover.jpeg";
import logoImg from "../../assets/AAFI-Logo.png";
import Profileimg from "../../assets/Aftab.jpeg";
import ISBN from "../../assets/MY ISBN.png";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import "./Book.css";
import "./BookCover.css";

/* =========================================================
   RESPONSIVE BOOK DIMENSIONS
   ========================================================= */

function getBookDimensions() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  /* =======================================================
     DESKTOP
     ======================================================= */

  if (vw >= 1024) {
    const w = Math.min(340, Math.floor((vw - 100) / 2));

    const h = Math.min(460, vh - 160);

    return {
      width: w,
      height: h + 20,
      portrait: false,
    };
  }

  /* =======================================================
     TABLET
     ======================================================= */

  if (vw >= 768) {
    const w = Math.min(320, Math.floor((vw - 80) / 2));

    const h = Math.min(460, vh - 140);

    return {
      width: w,
      height: h + 20,
      portrait: false,
    };
  }

  /* =======================================================
     MOBILE
     ======================================================= */

  const w = Math.min(340, Math.floor(vw * 0.9));

  const h = Math.min(460, vh - 160);

  return {
    width: w,
    height: h + 20,
    portrait: true,
  };
}

/* =========================================================
   COMPUTE TARGET PAGE
   Maps the current page index to the closest equivalent
   page in the new portrait/landscape layout.
   In portrait: every page is individual (0-17).
   In landscape: pages show in pairs — we round to the
   nearest even index so the spread starts correctly.
   ========================================================= */

function computeTargetPage(currentPage, toPortrait) {
  if (toPortrait) {
    /* Portrait shows single pages — same index is fine */
    return currentPage;
  }
  /* Landscape shows pairs — round down to even spread */
  return currentPage % 2 === 0 ? currentPage : currentPage - 1;
}

/* =========================================================
   BOOK COMPONENT
   ========================================================= */

const Book = () => {
  /* =======================================================
     BOOK PAGES

     PAGE 1  → HOME LEFT
     PAGE 2  → HOME RIGHT

    PAGE 3  → ABOUT LEFT
    PAGE 4  → ABOUT RIGHT

    PAGE 5  → PORTFOLIO LEFT
    PAGE 6  → PORTFOLIO RIGHT

    PAGE 7  → PORTFOLIO LEFT
    PAGE 8  → PORTFOLIO RIGHT

    PAGE 9  → PRICING SECTION 1 → STARTER
    PAGE 10 → PRICING SECTION 2 → BASIC

    PAGE 11 → PRICING SECTION 3 → PREMIUM
    PAGE 12 → PRICING SECTION 4 → BUSINESS

    PAGE 13 → CONTACT LEFT
    PAGE 14 → CONTACT RIGHT

    PAGE 15 → BACK COVER
     ======================================================= */

  const [pages] = useState([
    /* =====================================================
       PAGE 0
       FRONT COVER
       ===================================================== */

    {
      id: 0,
      type: "cover",
      title: "Selected Works",
      author: "MRA Developer",
    },

    /* =====================================================
       PAGE 1 - HOME LEFT
       ===================================================== */

    {
      id: 1,
      type: "component",
      componentName: "Home",
      isLeftPage: true, // Explicitly mark as left page
    },

    /* =====================================================
       PAGE 2 - HOME RIGHT
       ===================================================== */

    {
      id: 2,
      type: "component",
      componentName: "Home",
      isLeftPage: false, // Explicitly mark as right page
    },

     /* =====================================================
       PAGE 3 - ABOUT LEFT
       ===================================================== */

    {
      id: 3,
      type: "component",
      componentName: "About",
      isLeftPage: true,
    },

    /* =====================================================
       PAGE 4 - ABOUT RIGHT
       ===================================================== */

    {
      id: 4,
      type: "component",
      componentName: "About",
      isLeftPage: false,
    },

    /* =====================================================
       PAGE 5 - PORTFOLIO LEFT
       ===================================================== */

    {
      id: 5,
      type: "component",
      componentName: "Portfolio",
      spread: 1,
      isLeftPage: true,
    },

    /* =====================================================
      PAGE 6 - PORTFOLIO RIGHT
       ===================================================== */

    {
      id: 6,
      type: "component",
      componentName: "Portfolio",
      spread: 1,
      isLeftPage: false,
    },

    /* =====================================================
      PAGE 7 - PORTFOLIO LEFT
       ===================================================== */

    {
      id: 7,
      type: "component",
      componentName: "Portfolio",
      spread: 2,
      isLeftPage: true,
    },

    /* =====================================================
      PAGE 8 - PORTFOLIO RIGHT
       ===================================================== */

    {
      id: 8,
      type: "component",
      componentName: "Portfolio",
      spread: 2,
      isLeftPage: false,
    },

    /* =====================================================
      PAGE 9 - PRICING SECTION 1
       STARTER
       LEFT PAGE
       ===================================================== */

    {
      id: 9,
      type: "component",
      componentName: "Pricing",
      pricingSection: 1,
      isLeftPage: true,
    },

    /* =====================================================
      PAGE 10 - PRICING SECTION 2
       BASIC
       RIGHT PAGE
       ===================================================== */

    {
      id: 10,
      type: "component",
      componentName: "Pricing",
      pricingSection: 2,
      isLeftPage: false,
    },

    /* =====================================================
      PAGE 11 - PRICING SECTION 3
       PREMIUM
       LEFT PAGE
       ===================================================== */

    {
      id: 11,
      type: "component",
      componentName: "Pricing",
      pricingSection: 3,
      isLeftPage: true,
    },

    /* =====================================================
      PAGE 12 - PRICING SECTION 4
       BUSINESS
       RIGHT PAGE
       ===================================================== */

    {
      id: 12,
      type: "component",
      componentName: "Pricing",
      pricingSection: 4,
      isLeftPage: false,
    },

    /* =====================================================
      PAGE 13 - CONTACT LEFT
       ===================================================== */

    {
      id: 13,
      type: "component",
      componentName: "Contact",
      isLeftPage: true,
    },

    /* =====================================================
      PAGE 14 - CONTACT RIGHT
       ===================================================== */

    {
      id: 14,
      type: "component",
      componentName: "Contact",
      isLeftPage: false,
    },

    /* =====================================================
       PAGE 17
       BACK COVER
       ===================================================== */

    {
      id: 17,
      type: "backCover",
      title: "Selected Works",
      author: "MRA Developer",
    },
  ]);

  /* =======================================================
     STATE
     ======================================================= */

  const [dims, setDims] = useState(getBookDimensions);

  const [activePage, setActivePage] = useState(0);

  /* =======================================================
     START PAGE
     Passed to HTMLFlipBook so after a remount triggered by
     a breakpoint crossing the book reopens on the correct
     spread / page instead of always resetting to page 0.
     ======================================================= */

  const [startPage, setStartPage] = useState(0);

  const [isBookReady, setIsBookReady] = useState(false);

  const [isFlipbookMounted, setIsFlipbookMounted] = useState(false);

  const [isClosing, setIsClosing] = useState(false);

  const [isLanding, setIsLanding] = useState(true);

  /* =======================================================
     REVEALED STATE
     True after landing overlay dismissed, until the book
     has been fully opened from the preview state.
     ======================================================= */

  const [isRevealed, setIsRevealed] = useState(false);

  /* =======================================================
     PREVIEW STATE
     First click from the front cover advances into a preview
     page, and the second click opens the main content.
     ======================================================= */

  const [isPreviewStage, setIsPreviewStage] = useState(false);

  /* =======================================================
     BOOK REF
     ======================================================= */

  const bookRef = useRef(null);

  /* =======================================================
     REFS — track portrait mode across renders and timers
     ======================================================= */

  const prevPortraitRef = useRef(dims.portrait);
  const remountTimerRef = useRef(null);
  const resizeTimerRef = useRef(null);

  /* =======================================================
     ACTIVE PAGE REF
     Gives resize handler access to latest activePage
     without stale-closure issues.
     ======================================================= */

  const activePageRef = useRef(activePage);
  useEffect(() => {
    activePageRef.current = activePage;
  }, [activePage]);

  /* =======================================================
     RESIZE + ORIENTATION CHANGE
     ======================================================= */

  useEffect(() => {
    /* ---------------------------------------------------
       recalculate() — called after the debounce settles
       or immediately on orientationchange.
       --------------------------------------------------- */
    const recalculate = () => {
      const newDims = getBookDimensions();
      const crossedBreakpoint = newDims.portrait !== prevPortraitRef.current;

      /* Always update dimensions so CSS/layout recalc */
      setDims(newDims);

      if (crossedBreakpoint) {
        prevPortraitRef.current = newDims.portrait;

        /* Compute the closest equivalent page in the new
           layout so the book opens on the right section */
        const targetPage = computeTargetPage(
          activePageRef.current,
          newDims.portrait,
        );
        setStartPage(targetPage);

        /* Hide immediately — prevents stale layout flash */
        setIsFlipbookMounted(false);

        /* Re-show after the DOM has repainted with new dims */
        clearTimeout(remountTimerRef.current);
        remountTimerRef.current = setTimeout(() => {
          requestAnimationFrame(() => {
            setIsFlipbookMounted(true);
          });
        }, 80);
      }
    };

    /* ---------------------------------------------------
       Debounced resize — 100 ms quiet period so rapid
       drag-resizes don't cause multiple remounts.
       --------------------------------------------------- */
    const debouncedResize = () => {
      clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(recalculate, 100);
    };

    window.addEventListener("resize", debouncedResize);
    window.addEventListener("orientationchange", recalculate);

    /* =====================================================
       BOOK INITIALIZATION (first mount only)
       ===================================================== */

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsBookReady(true);

        setTimeout(() => {
          setIsFlipbookMounted(true);
        }, 50);
      });
    });

    return () => {
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("orientationchange", recalculate);
      clearTimeout(resizeTimerRef.current);
      clearTimeout(remountTimerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* =======================================================
     NAVIGATION MAPPING

    about       = 1
    portfolio   = 5
    pricing     = 9
    contact     = 13
    behindCover = 15
     ======================================================= */

  const SECTION_PAGES = {
    home: 0,
    about: 1,
    portfolio: 5,
    pricing: 9,
    contact: 13,
    behindCover: pages.length - 1,
  };

  /* =======================================================
     COMPONENT MAP
     ======================================================= */

  const COMPONENTS_MAP = {
    Home,
    Portfolio,
    About,
    Pricing,
    Contact,
  };

  /* =======================================================
     NAVIGATION CLICK
     ======================================================= */

  const handleNavClick = (e, section) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }

    if (isLanding) {
      return;
    }

    const targetPage = SECTION_PAGES[section];

    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().flip(targetPage);
    }
  };

  /* =======================================================
     START A PROJECT CLICK HANDLER
    Flips directly to page 3 (About / Start a Project)
     when user clicks "LET'S START" in Home or Pricing.
     ======================================================= */

  const handleStartProject = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();

      if (e.nativeEvent) {
        e.nativeEvent.stopImmediatePropagation();
      }
    }

    if (isLanding) {
      return;
    }

    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().flip(3);
    }
  };

  /* =======================================================
     FLIP STATE
     ======================================================= */

  const handleStateChange = (e) => {
    if (e.data === "read") {
      setIsClosing(false);
    }
  };

  /* =======================================================
     FLIP HANDLER
     ======================================================= */

  const handleFlip = (e) => {
    const newPage = typeof e.data === "number" ? e.data : 0;

    setActivePage(newPage);

    setIsClosing(false);

    if (newPage > 0) {
      setIsLanding(false);

      /* =====================================================
         Keep the reveal state active while the book is in its
         preview page, but clear it once the main content is
         actually opened.
         ===================================================== */

      if (newPage === 1 && isPreviewStage) {
        setIsRevealed(true);
      } else {
        setIsRevealed(false);
      }
    }
  };

  /* =======================================================
     OPEN BOOK FROM LANDING
     ======================================================= */

  const handleBookClick = (e) => {
    if (!isLanding || activePage !== 0) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    return;
  };

  /* =======================================================
     OPEN BOOK BUTTON HANDLER
     Called when user clicks the Open Book icon after
     the landing overlay has been dismissed.
     ======================================================= */

  const handleOpenBook = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLanding) {
      return;
    }

    if (activePage === 0 && !isPreviewStage) {
      setIsPreviewStage(true);
      setIsRevealed(true);

      setTimeout(() => {
        if (bookRef.current && bookRef.current.pageFlip()) {
          bookRef.current.pageFlip().flip(1);
        }
      }, 50);

      return;
    }

    if (activePage === 1 && isPreviewStage) {
      setIsPreviewStage(false);
      setIsRevealed(false);

      setTimeout(() => {
        if (bookRef.current && bookRef.current.pageFlip()) {
          bookRef.current.pageFlip().flip(2);
        }
      }, 50);

      return;
    }

    if (activePage === 1 && !isPreviewStage) {
      setIsRevealed(false);
      return;
    }

    setIsRevealed(false);
  };

  /* =======================================================
     LANDING OVERLAY CLICK
     ======================================================= */

  const handleOverlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLanding) {
      return;
    }

    setIsLanding(false);
    setIsPreviewStage(false);
    setIsRevealed(false);
  };

  /* =======================================================
     DIMENSIONS
     ======================================================= */

  const { width, height, portrait } = dims;

  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const getIsActive = (section) => {
    const target = SECTION_PAGES[section];

    if (activePage === 0) {
      return section === "home";
    }

    return portrait
      ? activePage === target
      : activePage === target || activePage + 1 === target;
  };

  /* =======================================================
     COVER STATES
     ======================================================= */

  const isFrontCover = activePage === 0;

  const isBackCover = activePage === pages.length - 1;

  const isClosed = isFrontCover || isBackCover || isClosing;

  /* =======================================================
     BOOK EDGE STACK SHADOW
     ======================================================= */

  const leftStack =
    "-1px 0 0 #e0e0e0, " +
    "-2px 0 0 #ffffff, " +
    "-3px 0 0 #cccccc, " +
    "-4px 0 0 #ffffff, " +
    "-5px 0 0 #e0e0e0, " +
    "-6px 0 0 #ffffff, " +
    "-7px 0 0 #cccccc, " +
    "-8px 0 0 #ffffff, " +
    "-9px 0 0 #a6a6a6";

  const rightStack =
    "1px 0 0 #e0e0e0, " +
    "2px 0 0 #ffffff, " +
    "3px 0 0 #cccccc, " +
    "4px 0 0 #ffffff, " +
    "5px 0 0 #e0e0e0, " +
    "6px 0 0 #ffffff, " +
    "7px 0 0 #cccccc, " +
    "8px 0 0 #ffffff, " +
    "9px 0 0 #a6a6a6";

  const ambientShadow =
    "0 20px 40px -10px rgba(0, 0, 0, 0.4), " + "0 0 20px rgba(0, 0, 0, 0.2)";

  /* =======================================================
     DYNAMIC BOOK SHADOW
     ======================================================= */

  let dynamicBoxShadow = ambientShadow;

  if (!portrait) {
    if (isClosed) {
      dynamicBoxShadow = "none";
    } else {
      dynamicBoxShadow = `${leftStack}, ${rightStack}, ${ambientShadow}`;
    }
  } else {
    if (isClosed) {
      dynamicBoxShadow = "none";
    } else {
      dynamicBoxShadow = ambientShadow;
    }
  }

  /* =======================================================
     BOOK POSITION
     ======================================================= */

  const getTransform = () => {
    /* =====================================================
       LANDING POSITION
       ===================================================== */

    if (isLanding) {
      if (window.innerWidth < 1024) {
        return !portrait ? `translateX(-${width / 2}px)` : "translateX(0px)";
      }

      return "translateX(10vw)";
    }

    /* =====================================================
       FRONT COVER
       ===================================================== */

    if (!portrait && activePage === 0) {
      return `translateX(-${width / 2}px)`;
    }

    /* =====================================================
       BACK COVER
       ===================================================== */

    if (!portrait && activePage === pages.length - 1) {
      return `translateX(${width / 2}px)`;
    }

    /* =====================================================
       NORMAL OPEN BOOK
       ===================================================== */

    return "translateX(0px)";
  };

  /* =======================================================
     MAIN
     ======================================================= */

  return (
    <div className={`book-wrapper ${isLanding ? "is-landing" : ""}`}>
      {/* ===================================================
          LANDING OVERLAY
         =================================================== */}

      <div className={`landing-overlay ${!isLanding ? "hidden" : ""}`}>
        {/* =================================================
            LANDING LEFT
           ================================================= */}

        <div className="landing-left">
          <div className="landing-logo">
            <span className="landing-logo-text">AAFI DESIGNS</span>
            <img
              src={logoImg}
              alt="AAFI Designs logo"
              className="landing-logo-image"
            />
          </div>

          <div className="landing-text-content">
            <h1 className="landing-heading">
              A NEW CHAPTER
              <br />
              IS BEING DESIGNED
            </h1>

            <h2 className="landing-subheading">
              Our full website is coming soon.
            </h2>

            <div className="landing-line"></div>

            <p className="landing-description">
              AAFI Designs helps authors create
              <br />
              professional books and publish with confidence.
            </p>

            {/* Desktop buttons - shown inside text content on desktop */}
            <div className="landing-buttons desktop-only">
              <button
                className="landing-btn landing-btn-primary"
                onClick={() =>
                  window.open("https://wa.me/351920420388", "_blank")
                }
              >
                START A PROJECT
              </button>

              <button
                className="landing-btn landing-btn-secondary"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/aafidesigns.official",
                    "_blank",
                  )
                }
              >
                VIEW OUR WORK
              </button>
            </div>
          </div>

          <div className="landing-copyright-wrapper desktop-only">
            <p className="landing-copyright">Copyright © 2026 AAFI Designs</p>
          </div>
        </div>

        {/* =================================================
            LANDING RIGHT
           ================================================= */}

        <div className="landing-right-top desktop-only">
          <a
            href="https://www.instagram.com/aafi.designs/"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-contact"
          >
            CONTACT
          </a>

          <div className="landing-divider"></div>

          <div className="landing-socials">
            <a
              href="https://www.facebook.com/aafidesigns.official"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-social-icon"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/aafi.designs/"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-social-icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/in/aaftabsheikh/"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-social-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* =================================================
          LANDING BUTTONS - Mobile only
          Positioned after text content and before book
         ================================================= */}

      {isLanding && (
        <div className="landing-buttons mobile-only-buttons mobile-only">
          <button
            className="landing-btn landing-btn-secondary"
            onClick={() =>
              window.open(
                "https://www.facebook.com/aafidesigns.official",
                "_blank",
              )
            }
          >
            View Our Work
          </button>

          <button
            className="landing-btn landing-btn-primary"
            onClick={() =>
              window.open("https://wa.me/351920420388", "_blank")
            }
          >
            Start a Project
          </button>
        </div>
      )}

      {isLanding && (
        <div className="landing-right-top mobile-only landing-right-top-mobile">
          <a
            href="https://www.instagram.com/aafi.designs/"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-contact"
          >
            CONTACT
          </a>

          <div className="landing-divider"></div>

          <div className="landing-socials">
            <a
              href="https://www.facebook.com/aafidesigns.official"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-social-icon"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/aafi.designs/"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-social-icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/in/aaftabsheikh/"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-social-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      )}

      {/* ===================================================
          NAVBAR
         =================================================== */}


      <header
        className={`site-header ${isLanding ? "hidden" : ""
          }`}
        style={{
          width: portrait ? width + 10 : width * 2 + 10,
        }}
      >
        <nav className="site-navbar">

          <a
            href="#home"
            className={`nav-link ${getIsActive("home")
              ? "active"
              : ""
              }`}
            onClick={(e) =>
              handleNavClick(e, "home")
            }
          >
            Home
          </a>


          <a
            href="#about"
            className={`nav-link ${getIsActive("about")
              ? "active"
              : ""
              }`}
            onClick={(e) =>
              handleNavClick(e, "about")
            }
          >
            About
          </a>


          <a
            href="#portfolio"
            className={`nav-link ${getIsActive("portfolio")
              ? "active"
              : ""
              }`}
            onClick={(e) =>
              handleNavClick(e, "portfolio")
            }
          >
            Portfolio
          </a>


          <a
            href="#pricing"
            className={`nav-link ${getIsActive("pricing")
              ? "active"
              : ""
              }`}
            onClick={(e) =>
              handleNavClick(e, "pricing")
            }
          >
            Pricing
          </a>


          <a
            href="#contact"
            className={`nav-link ${getIsActive("contact")
              ? "active"
              : ""
              }`}
            onClick={(e) =>
              handleNavClick(e, "contact")
            }
          >
            Contact
          </a>


          <a
            href="#behind-the-cover"
            className={`nav-link ${getIsActive("behindCover")
              ? "active"
              : ""
              }`}
            onClick={(e) =>
              handleNavClick(e, "behindCover")
            }
          >
            Behind the Cover
          </a>

        </nav>
      </header>


      {/* ===================================================
          BOOK STAGE
         =================================================== */}

      <div className={`book-stage-area ${isLanding ? "is-landing-pos" : ""}`}>
        <div
          className={`open-book-container ${isClosed ? "is-closed" : ""}`}
          onClick={(e) => {
            if (isLanding || activePage === 0) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          style={{
            transform: getTransform(),

            transition: isBookReady
              ? "transform 1s cubic-bezier(0.645, 0.045, 0.355, 1)"
              : "none",

            opacity: isBookReady && isFlipbookMounted ? 1 : 0,

            visibility: isBookReady && isFlipbookMounted ? "visible" : "hidden",

            willChange: "transform, opacity",

            backfaceVisibility: "hidden",

            WebkitBackfaceVisibility: "hidden",

            cursor: isLanding ? "pointer" : "default",

            pointerEvents:
              isLanding ? "none" : isRevealed || isBackCover ? "auto" : "none",
          }}
        >
          <div
            style={{
              position: "relative",

              width: portrait ? width + 10 : width * 2 + 10,

              height,

              pointerEvents: "auto",

              overflow: "visible",

              minWidth: portrait ? width + 10 : width * 2 + 10,

              minHeight: height,

              maxWidth: portrait ? width + 10 : width * 2 + 10,

              maxHeight: height,

              transform: "translateZ(0)",

              WebkitTransform: "translateZ(0)",
            }}
          >
            {/* =============================================
                BOOK SHADOW
               ============================================= */}

            <div
              className="book-dynamic-shadow"
              style={{
                position: "absolute",

                top: 0,

                left: portrait ? 0 : activePage === 0 ? width : 0,

                width: portrait ? width : isClosed ? width : width * 2,

                height,

                borderRadius: "6px",

                boxShadow: dynamicBoxShadow,

                display: isClosed ? "none" : "block",

                transition: isBookReady ? "all 0.7s ease" : "none",

                opacity: isClosed ? 0 : 1,

                visibility: isClosed ? "hidden" : "visible",

                zIndex: -1,

                pointerEvents: "none",
              }}
            />

            {/* =============================================
                LANDING CLICK AREA
               ============================================= */}

            {isLanding && (
              <div
                onClick={handleOverlayClick}
                style={{
                  position: "absolute",

                  inset: 0,

                  zIndex: 50,

                  cursor: "pointer",

                  pointerEvents: "auto",
                }}
              />
            )}

            {/* =============================================
                CLICK-PREVENTION OVERLAY (REVEALED STATE)
                Blocks all clicks on the book when isRevealed
                is true and isFrontCover is true, ensuring
                only the Open Book button can trigger navigation.
               ============================================= */}

            {isRevealed && isFrontCover && !isLanding && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                style={{
                  position: "absolute",

                  inset: 0,

                  zIndex: 10,

                  cursor: "default",

                  pointerEvents: "auto",

                  backgroundColor: "transparent",
                }}
              />
            )}

            {/* =============================================
                NAVIGATION ARROWS
               ============================================= */}

            {/* =============================================
                OPEN BOOK BUTTON (FRONT COVER)
                Shown after landing overlay is dismissed
                but before the book is actually opened.
                Uses same FaChevronRight as page-next arrow.
               ============================================= */}

            {isFrontCover && !isLanding && (
              <button
                className="book-open-btn"
                onClick={handleOpenBook}
                aria-label="Open Book"
                title="Open Book"
              >
                <FaChevronRight />
              </button>
            )}

            {/* =============================================
                CLOSE BOOK BUTTON (BACK COVER)
                Uses same FaChevronLeft as page-prev arrow,
                positioned on the left side of the book.
               ============================================= */}

            {isBackCover && !isLanding && (
              <button
                className="book-close-btn"
                onClick={(e) => {
                  e.stopPropagation();

                  setIsClosing(true);

                  if (bookRef.current && bookRef.current.pageFlip()) {
                    bookRef.current.pageFlip().flip(0);
                  }
                }}
                aria-label="Close Book"
                title="Close Book"
              >
                <FaChevronLeft />
              </button>
            )}

            {(!isClosed || isFrontCover) && !isLanding && (
              <>
                {/* PREVIOUS */}

                {activePage > 0 && !isFrontCover && (
                  <button
                    className="book-prev-arrow"
                    onClick={(e) => {
                      e.stopPropagation();

                      if (activePage === 1) {
                        setIsClosing(true);
                      }

                      if (bookRef.current && bookRef.current.pageFlip()) {
                        bookRef.current.pageFlip().flipPrev();
                      }
                    }}
                    aria-label="Previous Page"
                  >
                    <FaChevronLeft />
                  </button>
                )}

                {/* NEXT */}

                <button
                  className="book-next-arrow"
                  onClick={(e) => {
                    e.stopPropagation();

                    if (activePage === 0 || (activePage === 1 && isPreviewStage)) {
                      handleOpenBook(e);
                      return;
                    }

                    /*
                     * PAGE 18 IS THE LAST
                     * CONTENT PAGE BEFORE
                     * BACK COVER PAGE 19.
                     */

                    if (activePage === pages.length - 2) {
                      setIsClosing(true);
                    }

                    if (bookRef.current && bookRef.current.pageFlip()) {
                      bookRef.current.pageFlip().flipNext();
                    }
                  }}
                  aria-label="Next Page"
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            {/* =============================================
                HTML FLIP BOOK
               ============================================= */}

            <HTMLFlipBook
              key={`${portrait}-${width}-${height}-${startPage}`}
              width={width}
              height={height}
              size="fixed"
              maxShadowOpacity={0.5}
              showCover={true}
              /*
               * Disable page corner effect.
               */
              showPageCorners={false}
              mobileScrollSupport={true}
              clickEventForward={!isLanding && !isRevealed && !isFrontCover}
              useMouseEvents={false}
              onFlip={handleFlip}
              onChangeState={handleStateChange}
              className="html-book"
              ref={bookRef}
              usePortrait={portrait}
              drawShadow={true}
              flippingTime={700}
              startPage={startPage}
              style={{
                opacity: isBookReady && isFlipbookMounted ? 1 : 0,

                transition: isBookReady ? "opacity 0.01s ease" : "none",

                visibility:
                  isBookReady && isFlipbookMounted ? "visible" : "hidden",

                position: "relative",

                zIndex: 1,

                pointerEvents: isLanding ? "none" : "auto",
              }}
            >
              {/* =========================================
                  BOOK PAGES
                 ========================================= */}

              {pages.map((page, index) => {
                /* =======================================
                     FRONT COVER
                     ======================================= */

                if (page.type === "cover") {
                  return (
                    <div
                      key={page.id}
                      className="book-cover open-cover"
                      data-density="hard"
                      style={{
                        cursor: isRevealed && isFrontCover && !isLanding ? "pointer" : "pointer",
                        pointerEvents: isLanding ? "auto" : activePage === 0 ? "none" : "auto",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        if (isLanding) {
                          handleOverlayClick(e);
                          return;
                        }

                        if (activePage === 0) {
                          handleOpenBook(e);
                          return;
                        }

                        if (isPreviewStage && activePage === 1) {
                          handleOpenBook(e);
                          return;
                        }
                      }}
                    >
                      <img
                        src={coverImg}
                        alt="Cover texture"
                        className="book-cover-bg"
                      />

                      <div className="bc-spine-shadow" />

                      <div className="aafi-cover-overlay">
                        <div className="aafi-logo-wrapper">
                          <img
                            src={logoImg}
                            alt="AAFI Logo"
                            className="aafi-logo-symbol"
                          />
                        </div>

                        <div className="aafi-subtitle-wrapper">
                          <p>HELPING AUTHORS</p>

                          <p>LOOK PROFESSIONAL AND</p>

                          <p>PUBLISH CONFIDENTLY</p>
                        </div>
                      </div>
                    </div>
                  );
                }

                /* =======================================
                     BACK COVER
                     ======================================= */

                if (page.type === "backCover") {
                  return (
                    <div
                      key={page.id}
                      className="book-cover back-cover"
                      data-density="hard"
                      style={{
                        cursor: isLanding || isFrontCover ? "default" : "pointer"
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        /* Block back cover click during landing or revealed state */
                        if (isLanding || isRevealed || isFrontCover) {
                          return;
                        }
                        if (
                          bookRef.current &&
                          bookRef.current.pageFlip()
                        ) {
                          bookRef.current.pageFlip().flip(1);
                        }
                      }}
                    >
                      <img
                        src={coverImg}
                        alt="Cover texture"
                        className="book-cover-bg"
                        style={{ transform: "scaleX(-1)" }}
                      />

                      {/* =========================================
                          BACK COVER REDESIGN
                         ========================================= */}

                      <div className="bc-layout">
                        {/* TITLE */}
                        <div className="bc-title-area">
                          <h2 className="bc-title">about the designer</h2>
                        </div>

                        {/* PHOTO */}
                        <div className="bc-photo-area">
                          <img
                            src={Profileimg}
                            alt="Aftab Sheikh"
                            className="bc-photo"
                          />
                        </div>

                        {/* BIO */}
                        <div className="bc-bio-area">
                          <p className="bc-para">
                            <strong className="bc-strong">Sheikh Aftab</strong>{" "}
                            is the founder and creative mind behind{" "}
                            <em className="bc-em">AAFI Designs</em>. With more
                            than 25 years of experience, he has progressed from
                            graphic designer to Art Director, working with
                            established advertising agencies across publishing,
                            branding, communication and print production.
                          </p>
                          <p className="bc-para">
                            Having completed over 2,000 creative projects for
                            institutions, businesses and international clients,
                            Aftab now specializes in helping independent authors
                            and publishers transform their ideas into
                            distinctive book covers and professionally crafted
                            interiors. He brings strategic thinking, strong
                            typography and visual storytelling to every project.
                          </p>
                          <p className="bc-para">
                            Originally from Pakistan and now based in Lisbon,
                            Portugal, Aftab works with clients worldwide. Beyond
                            the studio, he enjoys photography, travel and
                            discovering creative inspiration in everyday life.
                          </p>
                        </div>

                        {/* BOTTOM: ISBN BOX (white rounded container) */}
                        <div className="bc-bottom-area">
                          <div className="bc-isbn-box">
                            <img
                              src={ISBN}
                              alt="ISBN Barcode"
                              className="bc-isbn"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                /* =======================================
                     COMPONENT PAGES
                     ======================================= */

                if (page.type === "component") {
                  const ComponentToRender = COMPONENTS_MAP[page.componentName];

                  /*
                   * For mobile/portrait mode, we use the explicit isLeftPage
                   * from the page definition to determine which version to show.
                   * For desktop, we use the index parity to determine left/right.
                   */

                  const isLeft = portrait
                    ? page.isLeftPage // Use explicit value for mobile
                    : index % 2 !== 0; // Use index parity for desktop

                  /* =====================================
                       PRICING
                       ===================================== */

                  if (page.componentName === "Pricing") {
                    return (
                      <BookPage
                        key={page.id}
                        number={page.id}
                        pageTitle="Pricing"
                        isLeft={isLeft}
                      >
                        <ComponentToRender
                          isLeft={isLeft}
                          section={page.pricingSection}
                          onStartProject={handleStartProject}
                        />
                      </BookPage>
                    );
                  }

                  /* =====================================
                       NORMAL COMPONENTS
                       ===================================== */

                  return (
                    <BookPage
                      key={page.id}
                      number={page.id}
                      pageTitle={page.componentName}
                      isLeft={isLeft}
                    >
                      {ComponentToRender && (
                        <ComponentToRender
                          isLeft={isLeft}
                          spread={page.spread}
                          onStartProject={handleStartProject}
                        />
                      )}
                    </BookPage>
                  );
                }

                return null;
              })}
            </HTMLFlipBook>
          </div>
        </div>
      </div>

      {/* ===================================================
          MOBILE "START A PROJECT" BUTTON
          (Below book on mobile devices only)
         =================================================== */}

      {!isLanding && dims.portrait && (
        <div className="mobile-start-project-btn-wrapper">
          <button
            type="button"
            className="mobile-start-project-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              if (e.nativeEvent) {
                e.nativeEvent.stopImmediatePropagation();
              }

              window.open(
                "https://w.app/aafidesigns",
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            LET'S START
          </button>
        </div>
      )}

      {/* ===================================================
          FOOTER
         =================================================== */}

      <footer className={`site-footer ${isLanding ? "hidden" : ""}`}>
        <div className="footer-left">Copyright © 2026 AAFI Designs</div>

        <div className="footer-center">
          <a
            href="https://www.facebook.com/aafidesigns.official"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>

          <a
            href="http://instagram.com/aafi.designs"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.linkedin.com/in/aaftabsheikh/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>

        <div className="footer-right">Designed by: MRA Developers</div>
      </footer>

      {/* ===================================================
          MOBILE LANDING COPYRIGHT
         =================================================== */}

      {isLanding && (
        <div className="landing-copyright-wrapper mobile-only">
          <p className="landing-copyright">Copyright © 2026 AAFI Designs</p>
        </div>
      )}
    </div>
  );
};

export default Book;
