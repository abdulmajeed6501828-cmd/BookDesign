import React, { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

import BookPage from "./BookPage";
import Home from "../Sections/Home";
import Portfolio from "../Sections/Portfolio";
import Clients from "../Sections/Clients";
import About from "../Sections/About";
import Pricing from "../Sections/Pricing";
import Contact from "../Sections/Contact";
import coverImg from "../../assets/cover.jpeg";
import logoImg from "../../assets/logo2.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import "./Book.css";
import "./BookCover.css";

/* ── Responsive book dimensions ──────────────────────────────────────────────
   We compute page width/height from the viewport so the book always fits.
*/
function getBookDimensions() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (vw >= 1024) {
    const w = Math.min(340, Math.floor((vw - 100) / 2));
    const h = Math.min(460, vh - 160);
    return { width: w, height: h, portrait: false };
  } else if (vw >= 768) {
    const w = Math.min(320, Math.floor((vw - 80) / 2));
    const h = Math.min(460, vh - 140);
    return { width: w, height: h, portrait: false };
  } else {
    // Keep cover properly fitted and consistent on smaller screens; only adapt when absolutely necessary
    const w = Math.min(340, Math.floor(vw * 0.9));
    const h = Math.min(460, vh - 120);
    return { width: w, height: h, portrait: true };
  }
}

const Book = () => {
  const [pages] = useState([
    { id: 0, type: "cover", title: "Selected Works", author: "MRA Developer" },
    { id: 1, type: "component", componentName: "Home" },
    { id: 2, type: "component", componentName: "Home" },
    { id: 3, type: "component", componentName: "Portfolio" },
    { id: 4, type: "component", componentName: "Portfolio" },
    { id: 5, type: "component", componentName: "Pricing" },
    { id: 6, type: "component", componentName: "Pricing" },
    { id: 7, type: "component", componentName: "Clients" },
    { id: 8, type: "component", componentName: "Clients" },
    { id: 9, type: "component", componentName: "About" },
    { id: 10, type: "component", componentName: "About" },
    { id: 11, type: "component", componentName: "Contact" },
    { id: 12, type: "component", componentName: "Contact" },
    { id: 13, type: "backCover", title: "Selected Works", author: "MRA Developer" }
  ]);
  const [dims, setDims] = useState(getBookDimensions);
  const [activePage, setActivePage] = useState(0);
  const bookRef = useRef(null);

  // ── Recalculate book size on window resize ────────────────────────────────
  useEffect(() => {
    const handleResize = () => setDims(getBookDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  // Removed custom openBook animation logic

  const [isClosing, setIsClosing] = useState(false);
  const [isLanding, setIsLanding] = useState(true);

  // ── Navigation mapping ────────────────────────────────────────────────────
  const SECTION_PAGES = {
    home: 1,
    portfolio: 3,
    pricing: 5,
    clients: 7,
    about: 9,
    contact: 11,
  };
  
  const COMPONENTS_MAP = {
    Home,
    Portfolio,
    Clients,
    About,
    Pricing,
    Contact,
  };

  const handleNavClick = (e, section) => {
    e.preventDefault();
    const targetPage = SECTION_PAGES[section];
    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().flip(targetPage);
    }
  };

  const handlePointerDown = (e) => {
    if (activePage === 1 && e.clientX < window.innerWidth / 2) {
      setIsClosing(true);
    } else if (activePage === pages.length - 2 && e.clientX > window.innerWidth / 2) {
      setIsClosing(true);
    }
  };

  const handleStateChange = (e) => {
    if (e.data === "read") {
      setIsClosing(false);
    }
  };

  const handleFlip = (e) => {
    setActivePage(e.data);
    setIsClosing(false);
  };

  const { width, height, portrait } = dims;

  const getIsActive = (section) => {
    const target = SECTION_PAGES[section];
    return portrait ? activePage === target : (activePage === target || activePage + 1 === target);
  };

  const isFrontCover = activePage === 0;
  const isBackCover = activePage === pages.length - 1;
  const isClosed = isFrontCover || isBackCover || isClosing;

  const leftStack = "-1px 0 0 #e0e0e0, -2px 0 0 #ffffff, -3px 0 0 #cccccc, -4px 0 0 #ffffff, -5px 0 0 #e0e0e0, -6px 0 0 #ffffff, -7px 0 0 #cccccc, -8px 0 0 #ffffff, -9px 0 0 #a6a6a6";
  const rightStack = "1px 0 0 #e0e0e0, 2px 0 0 #ffffff, 3px 0 0 #cccccc, 4px 0 0 #ffffff, 5px 0 0 #e0e0e0, 6px 0 0 #ffffff, 7px 0 0 #cccccc, 8px 0 0 #ffffff, 9px 0 0 #a6a6a6";
  const ambientShadow = "0 20px 40px -10px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 0, 0, 0.2)";
  
  let dynamicBoxShadow = ambientShadow;
  if (!portrait) {
    if (isClosed) {
      dynamicBoxShadow = "none"; // Hide shadow when closed
    } else {
      dynamicBoxShadow = `${leftStack}, ${rightStack}, ${ambientShadow}`; // Show edges when open
    }
  } else {
    if (isClosed) {
      dynamicBoxShadow = "none"; // Hide shadow when closed
    } else {
      dynamicBoxShadow = ambientShadow; // Hide edges in portrait mode
    }
  }

  // ── Main ──────────────────────────────────────────────────────────────────
  return (
    <div className={`book-wrapper ${isLanding ? 'is-landing' : ''}`}>
      
      {/* Landing Overlay */}
      <div className={`landing-overlay ${!isLanding ? 'hidden' : ''}`}>
        <div className="landing-left">
          <div className="landing-logo">AAFI DESIGNS</div>
          
          <div className="landing-text-content">
            <h1 className="landing-heading">
              A NEW CHAPTER<br />IS BEING DESIGNED
            </h1>
            <h2 className="landing-subheading">Our full website is coming soon.</h2>
            <div className="landing-line"></div>
            <p className="landing-description">
              AAFI Designs helps authors create<br />
              professional books and publish with confidence.
               
            </p>
            <div className="landing-buttons">
              <button className="landing-btn landing-btn-primary" onClick={() => window.open('https://w.app/aafidesigns', '_blank')}>START A PROJECT</button>
              <button className="landing-btn landing-btn-secondary" onClick={() => window.open('https://www.facebook.com/aafidesigns.official', '_blank')}>VIEW OUR WORK</button>
            </div>
          </div>
          
          <div className="landing-copyright-wrapper desktop-only">
            <p className="landing-copyright">Copyright © 2026 AAFI Designs</p>
          </div>
        </div>
        
        <div className="landing-right-top">
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

      {/* Top Navbar */}
      <header className={`site-header ${isLanding ? 'hidden' : ''}`}>
        <nav className="site-navbar">
          <a
            href="#home"
            className={`nav-link ${getIsActive("home") ? "active" : ""}`}
            onClick={(e) => handleNavClick(e, "home")}
          >
            HOME
          </a>
          <a
            href="#portfolio"
            className={`nav-link ${getIsActive("portfolio") ? "active" : ""}`}
            onClick={(e) => handleNavClick(e, "portfolio")}
          >
            PORTFOLIO
          </a>
          <a
            href="#pricing"
            className={`nav-link ${getIsActive("pricing") ? "active" : ""}`}
            onClick={(e) => handleNavClick(e, "pricing")}
          >
            PRICING
          </a>
          <a
            href="#clients"
            className={`nav-link ${getIsActive("clients") ? "active" : ""}`}
            onClick={(e) => handleNavClick(e, "clients")}
          >
            CLIENTS
          </a>
          <a
            href="#about"
            className={`nav-link ${getIsActive("about") ? "active" : ""}`}
            onClick={(e) => handleNavClick(e, "about")}
          >
            ABOUT
          </a>
          <a
            href="#contact"
            className={`nav-link ${getIsActive("contact") ? "active" : ""}`}
            onClick={(e) => handleNavClick(e, "contact")}
          >
            CONTACT
          </a>
        </nav>
      </header>

      {/* Stage Area */}
      <div className={`book-stage-area ${isLanding ? 'is-landing-pos' : ''}`}>
          <div 
            className={`open-book-container ${isClosed ? "is-closed" : ""}`}
            onPointerDown={handlePointerDown}
            style={{
              transform: isLanding
                ? (window.innerWidth < 1024 
                    ? (!portrait ? `translateX(-${width / 2}px)` : `translateX(0px)`) 
                    : `translateX(14vw)`)
                : (!portrait && activePage === 0 
                ? `translateX(-${width / 2}px)`
                : !portrait && activePage === pages.length - 1
                ? `translateX(${width / 2}px)`
                : "translateX(0px)"),
              transition: "transform 1s cubic-bezier(0.645, 0.045, 0.355, 1)"
            }}
          >
            <div style={{ position: "relative", width: portrait ? width : width * 2, height: height, pointerEvents: isLanding ? 'none' : 'auto' }}>
              <div 
                className="book-dynamic-shadow"
                style={{
                  position: "absolute",
                  top: 0,
                  left: portrait ? 0 : (activePage === 0 ? width : 0),
                  width: portrait ? width : (isClosed ? width : width * 2),
                  height: height,
                  borderRadius: "6px",
                  boxShadow: dynamicBoxShadow,
                  display: isClosed ? "none" : "block",
                  transition: "all 0.7s ease",
                  opacity: isClosed ? 0 : 1,
                  visibility: isClosed ? "hidden" : "visible",
                  zIndex: -1,
                  pointerEvents: "none"
                }}
              />
              <HTMLFlipBook
                key={`${portrait}-${width}-${height}`}
                width={width}
                height={height}
                size="fixed"
                maxShadowOpacity={0.5}
                showCover={true}
                showPageCorners={false}
                mobileScrollSupport={true}
                onFlip={handleFlip}
                onChangeState={handleStateChange}
                className="html-book"
                ref={bookRef}
                usePortrait={portrait}
                drawShadow={true}
                flippingTime={700}
                startPage={activePage}
              >
              {pages.map((page, index) => {
                if (page.type === "cover") {
                  return (
                    <div
                      key={page.id}
                      className="book-cover open-cover"
                      data-density="hard"
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
                            alt="DA Monogram"
                            className="aafi-logo-symbol"
                          />
                          <h2 className="aafi-brand-title">AAFI DESIGNS</h2>
                        </div>
                        <div className="aafi-subtitle-wrapper">
                          <p>HELPING AUTHORS</p>
                          <p>LOOK PROFESSIONAL AND</p>
                          <p>PUBLISH CONFIDENTLY</p>
                        </div>
                      
                      </div>
                    </div>
                  );
                } else if (page.type === "backCover") {
                  return (
                    <div
                      key={page.id}
                      className="book-cover back-cover"
                      data-density="hard"
                    >
                      <img
                        src={coverImg}
                        alt="Cover texture"
                        className="book-cover-bg"
                        style={{ transform: "scaleX(-1)" }}
                      />
                    </div>
                  );
                } else if (page.type === "component") {
                  const ComponentToRender = COMPONENTS_MAP[page.componentName];
                  const isLeftPage = portrait ? false : index % 2 !== 0;
                  return (
                    <BookPage
                      key={page.id}
                      number={page.id}
                      pageTitle={page.componentName}
                      isLeft={isLeftPage}
                    >
                      {ComponentToRender && <ComponentToRender isLeft={isLeftPage} />}
                    </BookPage>
                  );
                } else {
                  return null;
                }
              })}
            </HTMLFlipBook>
            </div>
          </div>
      </div>

      {/* Bottom Footer */}
      <footer className={`site-footer ${isLanding ? 'hidden' : ''}`}>
        <div className="footer-left">Copyright © 2026 AAFI Designs</div>
        <div className="footer-center">
          <a
            href="https://www.facebook.com/aafidesigns.official"
            target="_blank" rel="noopener noreferrer"
            className="social-icon"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="http://instagram.com/aafi.designs"
            target="_blank" rel="noopener noreferrer"
            className="social-icon"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/aaftabsheikh/"
            target="_blank" rel="noopener noreferrer"
            className="social-icon"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
        <div className="footer-right">Designed by: MRA Developers</div>
      </footer>

      {isLanding && (
        <div className="landing-copyright-wrapper mobile-only">
          <p className="landing-copyright">Copyright © 2026 AAFI Designs</p>
        </div>
      )}
    </div>
  );
};

export default Book;
