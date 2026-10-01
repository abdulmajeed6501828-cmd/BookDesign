import React, { useLayoutEffect, useRef } from "react";

/* =========================================================
   TEXT CONTENT
   ========================================================= */

const L1 =
  "AAFI Designs offers complete creative solutions for independent authors, publishers and businesses looking for professional, distinctive and market-ready designs. Our services include custom book-cover design, ebook and print-ready covers, interior formatting, ACX audiobook artwork, 3D book mockups, author branding, logos, promotional graphics and other publishing materials.";

const L2 =
  "With more than 25 years of experience in graphic design, advertising, art direction and print production, we understand that an effective book design must do more than simply look attractive. It should communicate the book's message, connect with its intended audience, reflect the expectations of its genre and remain clear and engaging at both full size and thumbnail size.";

const R1 =
  "Having successfully completed more than 2,000 creative projects, AAFI Designs brings experience, thoughtful creative direction and careful attention to detail to every assignment. We work closely with each client to understand their ideas, audience and publishing goals before developing a design tailored specifically to their project.";

const R2 =
  "Choose AAFI Designs for original concepts, professional typography, clear communication, reliable service and accurately prepared publishing files. From the initial idea to final delivery, we are committed to making the creative process smooth and helping every book make a confident, memorable and professional first impression.";

const CL = "Great stories deserve exceptional design—let's create yours.";

const withItalicBrand = (text) =>
  text.split("AAFI Designs").map((part, index, parts) => (
    <React.Fragment key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 && (
        <em
          style={{
            fontStyle: "italic",
            fontWeight: 300,
            color: "#3a342c",
          }}
        >
          AAFI Designs
        </em>
      )}
    </React.Fragment>
  ));

const withAboutLineBreaks = (text) => {
  const [beforePublishers, afterPublishers] = text.split(" publishers");
  const [beforeMarketReady, afterMarketReady] = afterPublishers.split(" market-ready");
  const [beforeInclude, afterInclude] = afterMarketReady.split(" include");
  const [beforeEbook, afterEbook] = afterInclude.split(" ebook");
  const [beforeBookMockups, afterBookMockups] = afterEbook.split(" book mockups");
  const [beforePublishing, afterPublishing] = afterBookMockups.split(" publishing");
  return (
    <>
      {withItalicBrand(beforePublishers)}
      <br className="about-copy-break" />{" "}
      publishers{beforeMarketReady} market-ready{beforeInclude}
      <br className="about-copy-break" />{" "}
      include{beforeEbook}
      <br className="about-copy-break" />{" "}
      ebook{beforeBookMockups}
      <br className="about-copy-break" />{" "}
      book mockups{beforePublishing}
      <br className="about-copy-break" />{" "}
      publishing{afterPublishing}
    </>
  );
};

const withSecondAboutLineBreaks = (text) => {
  const [beforePrintProduction, afterPrintProduction] = text.split(" and print production");
  const [beforeEffectiveDesign, afterEffectiveDesign] = afterPrintProduction.split(" an effective book design must do more");
  const [beforeSimplyAttractive, afterSimplyAttractive] = afterEffectiveDesign.split(" than simply look attractive");
  const [beforeConnect, afterConnect] = afterSimplyAttractive.split(" connect with its intended audience");
  const [beforeReflect, afterReflect] = afterConnect.split(" reflect the expectations of its genre");
  const [beforeRemainClear, afterRemainClear] = afterReflect.split(" remain clear and engaging at both full");
  const [beforeThumbnailSize, afterThumbnailSize] = afterRemainClear.split(" size and thumbnail size");
  return (
    <>
      {beforePrintProduction}
      <br className="about-copy-break" />{" "}
      and print production{beforeEffectiveDesign}
      <br className="about-copy-break" />{" "}
      an effective book design must do more{beforeSimplyAttractive}
      <br className="about-copy-break" />{" "}
      than simply look attractive{beforeConnect}
      <br className="about-copy-break" />{" "}
      connect with its intended audience{beforeReflect}
      <br className="about-copy-break" />{" "}
      reflect the expectations of its genre{beforeRemainClear}
      <br className="about-copy-break" />{" "}
      remain clear and engaging at both full{beforeThumbnailSize}
      <br className="about-copy-break" />{" "}
      size and thumbnail size{afterThumbnailSize}
    </>
  );
};

const FONT = "'Helvetica Light', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const PAGE = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: 0,
  width: "100%",
  boxSizing: "border-box",
  overflow: "hidden",
  paddingTop: "clamp(8px, 1.4vh, 14px)",
  paddingBottom: "clamp(8px, 1.4vh, 14px)",
};

const PARA = {
  margin: 0,
  fontFamily: FONT,
  fontWeight: 300,
  /* Fixed px range — NOT vh-based, so it stays book-sized regardless of screen height */
  fontSize: "11.2px",
  lineHeight: 1.56,
  color: "#2a2723",
};

/* =========================================================
   LINE COUNT SYNC
   The 1242px – 1978px layout calculates its line height from the
   number of text lines on the page (--sp-n-left / --sp-n-right).
   That number changes with the screen / book size, so instead of
   guessing it in CSS, each page counts the lines it really renders
   and writes the result to its own wrapper. The line height is then
   always right, and the content (and the START A PROJECT button)
   always fits inside the page at every desktop size up to 1978px.
   ========================================================= */

const countLines = (p) => {
  /* Layout-based count: offsetHeight / line-height is NOT affected by
     3D / scale transforms, so it stays correct during a page flip. */
  const cs = window.getComputedStyle(p);
  const lh = parseFloat(cs.lineHeight);
  const h = p.offsetHeight;
  if (lh > 0 && h > 0) {
    return Math.max(1, Math.round(h / lh));
  }

  /* Fallback: count from rendered rects */
  const range = document.createRange();
  range.selectNodeContents(p);
  const tops = Array.from(range.getClientRects())
    .filter((r) => r.width > 0 && r.height > 0)
    .map((r) => r.top)
    .sort((a, b) => a - b);
  if (!tops.length) return 0;
  const fs = parseFloat(cs.fontSize) || 12;
  let lines = 1;
  let last = tops[0];
  tops.forEach((t) => {
    if (t - last > fs * 0.6) {
      lines += 1;
      last = t;
    }
  });
  return lines;
};

const useLineCountSync = (pageRef, cssVar, fitVar, fillButton) => {
  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;
    const wrapper = page.closest(".about-responsive");
    if (!wrapper) return undefined;

    const update = () => {
      const paragraphs = Array.from(page.querySelectorAll("p"));
      const total = paragraphs.reduce((sum, p) => sum + countLines(p), 0);
      if (total > 0 && wrapper.style.getPropertyValue(cssVar) !== String(total)) {
        wrapper.style.setProperty(cssVar, String(total));
      }

      /* LEFT PAGE ONLY: nudge the line height until the last line sits
         exactly on the bottom margin (the same line as the bottom of the
         START A PROJECT button on the right page). */
      if (fitVar && total > 0 && paragraphs.length) {
        const lastP = paragraphs[paragraphs.length - 1];
        let adj = 0;
        wrapper.style.setProperty(fitVar, "0px");
        for (let i = 0; i < 4; i += 1) {
          const rect = page.getBoundingClientRect();
          const scale = page.offsetWidth ? rect.width / page.offsetWidth : 1;
          const padBottom = parseFloat(window.getComputedStyle(page).paddingBottom) || 0;
          const target = rect.bottom - padBottom * scale;
          const slack = (target - lastP.getBoundingClientRect().bottom) / scale;
          if (Math.abs(slack) < 0.5) break;
          adj += slack / Math.max(total - 0.5, 1);
          adj = Math.max(-12, Math.min(adj, 40));
          wrapper.style.setProperty(fitVar, `${adj}px`);
        }
      }

      /* RIGHT PAGE, SINGLE-PAGE (PORTRAIT) MODE ONLY: the button is pinned
         to the bottom margin, so any free height between the last line and
         the button is closed by raising the line height until the text
         reaches the button (only the normal button gap stays). */
      if (fillButton && total > 0 && paragraphs.length && wrapper.closest(".is-portrait")) {
        const buttonWrap = page.querySelector(".home-right-button");
        const lastP = paragraphs[paragraphs.length - 1];
        if (buttonWrap) {
          /* Try the larger font first; if the text would then run into the
             button even at the tightest line height, step the size down. */
          const scales = [1.12, 1.08, 1.04, 1];
          for (let k = 0; k < scales.length; k += 1) {
            wrapper.style.setProperty("--ab-fs-scale", String(scales[k]));
            wrapper.style.removeProperty("--ab-lh");
            let slack = 0;
            for (let i = 0; i < 4; i += 1) {
              const rect = page.getBoundingClientRect();
              const scale = page.offsetWidth ? rect.width / page.offsetWidth : 1;
              slack =
                (buttonWrap.getBoundingClientRect().top - lastP.getBoundingClientRect().bottom) / scale;
              if (Math.abs(slack) < 0.5) break;
              const cs = window.getComputedStyle(lastP);
              const fs = parseFloat(cs.fontSize) || 14;
              const lhPx = parseFloat(cs.lineHeight) || fs * 1.6;
              /* the larger font wraps to more lines, so recount them */
              const lines = paragraphs.reduce((sum, para) => sum + countLines(para), 0) || total;
              const factor = Math.max(1.3, Math.min((lhPx + slack / lines) / fs, 3));
              wrapper.style.setProperty("--ab-lh", String(factor));
            }
            if (slack >= -0.5) break;
          }
        }
      }
    };

       update();

    /* Re-measure after the page-flip animation / transition has finished */
    const timers = [60, 250, 600, 1200].map((ms) => setTimeout(update, ms));
    const onEnd = () => update();
    document.addEventListener("transitionend", onEnd, true);
    document.addEventListener("animationend", onEnd, true);

    let observer = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(update);
      observer.observe(page);
      observer.observe(wrapper);
    }
    window.addEventListener("resize", update);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(update).catch(() => {});
    }

    return () => {
      timers.forEach(clearTimeout);
      document.removeEventListener("transitionend", onEnd, true);
      document.removeEventListener("animationend", onEnd, true);
      if (observer) observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [pageRef, cssVar]);
};

/* =========================================================
   LEFT PAGE — ABOUT LEFT
   ========================================================= */

const HomeLeft = () => {
  const pageRef = useRef(null);
  useLineCountSync(pageRef, "--sp-n-left", "--sp-lh-adj-l");

  return (
  <div
    ref={pageRef}
    className="home-left-page"
    style={{
      ...PAGE,
      justifyContent: "flex-start",
      paddingLeft: "clamp(14px, 2.8vw, 28px)",
      paddingRight: "clamp(6px, 1vw, 10px)",
    }}
  >
    {/* HEADING — "About" with the continuous gold line used by Portfolio */}
    <div
      className="home-left-header"
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
        About
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

    {/* LEFT CONTENT — paragraphs stacked with clear gap between them */}
    <div className="about-copy-container">
      <div
        className="home-left-content"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <p style={{ ...PARA }}>
          {withAboutLineBreaks(L1)}
        </p>
        <p style={{ ...PARA }}>
          {withSecondAboutLineBreaks(L2)}
        </p>
      </div>
    </div>
  </div>
  );
};

/* =========================================================
   RIGHT PAGE — ABOUT RIGHT
   ========================================================= */

const HomeRight = ({ onStartProject }) => {
  const pageRef = useRef(null);
  useLineCountSync(pageRef, "--sp-n-right", null, true);

  return (
  <div
    ref={pageRef}
    className="home-right-page"
    style={{
      ...PAGE,
      justifyContent: "space-between",
      paddingLeft: "clamp(6px, 1vw, 10px)",
      paddingRight: "clamp(14px, 2.8vw, 28px)",
    }}
  >
    {/* RIGHT CONTENT — 3 paragraphs with clear gaps matching PDF */}
    <div className="about-copy-container">
      <div
        className="home-right-content"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <p style={{ ...PARA }}>
          {withItalicBrand(R1)}
        </p>

        <p style={{ ...PARA }}>
          {withItalicBrand(R2)}
        </p>

        <p
          style={{
            ...PARA,
            fontStyle: "italic",
            color: "#3a342c",
          }}
        >
          {CL}
        </p>
      </div>
    </div>

    {/* BUTTON — START A PROJECT */}
    <div
      className="home-right-button"
      style={{
        paddingTop: "clamp(12px, 1.8vh, 18px)",
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.nativeEvent) {
            e.nativeEvent.stopImmediatePropagation();
          }
          if (onStartProject) {
            onStartProject(e);
          }
        }}
        style={{
          fontFamily: FONT,
          fontWeight: 400,
          fontSize: "clamp(9px, 0.95vw, 10.5px)",
          letterSpacing: "1.8px",
          textTransform: "uppercase",
          color: "#b39a69",
          backgroundColor: "transparent",
          border: "1.5px solid #b39a69",
          padding: "7px 28px",
          cursor: "pointer",
          borderRadius: "2px",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#b39a69";
          e.target.style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "transparent";
          e.target.style.color = "#b39a69";
        }}
      >
        START A PROJECT
      </button>
    </div>
  </div>
  );
};

/* =========================================================
   MOBILE RESPONSIVE STYLES
   ========================================================= */

const responsiveStyle = `
  .about-copy-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 330px;
    min-width: 0;
    min-height: 0;
    box-sizing: border-box;
    flex: 1 1 auto;
    overflow: hidden;
    align-self: flex-start;
  }

  .home-left-page {
    position: relative;
    z-index: 3;
    overflow: visible !important;
  }

  .home-right-page {
    position: relative;
    z-index: 1;
  }

  .home-left-content,
  .home-right-content {
    width: 100%;
    min-height: 0;
    gap: 0 !important;
    overflow: visible !important;
  }

  .home-left-content {
    position: relative;
    z-index: 4;
  }

  .home-right-button {
    position: relative;
    z-index: 0;
  }

  .home-left-content p {
    font-family: 'Helvetica Light', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
    font-size: 11.7px !important;
    line-height: 1.45 !important;
    letter-spacing: 0 !important;
    margin: 0 0 9px 0 !important;
  }

  .home-right-content p {
    font-size: 11.7px !important;
    line-height: 1.45 !important;
    margin: 0 0 9px 0 !important;
  }

  .home-left-page,
  .home-right-page,
  .home-left-content,
  .home-right-content {
    min-width: 0;
  }

  .home-left-content p,
  .home-right-content p {
    max-width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  @media (max-width: 639px) {
    .about-copy-container {
      max-width: 100%;
      width: 100%;
      flex: 1 1 auto;
      min-height: 0;
      overflow: visible;
      padding: 0;
      margin: 0;
    }

    .about-copy-break {
      display: none;
    }

    .home-left-page,
    .home-right-page {
      height: auto !important;
      min-height: 0 !important;
      max-height: none !important;
      overflow: visible !important;
      padding-left: 10px !important;
      padding-right: 10px !important;
      padding-bottom: 0 !important;
      box-sizing: border-box;
    }

    /* LEFT PAGE */
    .home-left-content,
    .home-right-content {
      gap: 0 !important;
      overflow: visible !important;
      flex: 1 1 auto;
      min-height: 0;
      justify-content: flex-start !important;
    }

    .home-left-content {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      transform: none !important;
    }

    .home-left-content p {
      font-family: 'Helvetica Light', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
      font-size: clamp(11.3px, 2.5vw, 11.9px) !important;
      line-height: 1.42 !important;
      overflow-wrap: anywhere;
      margin: 0 0 7px 0 !important;
    }

    /* RIGHT PAGE */
    .home-right-content {
      justify-content: flex-start !important;
      padding-bottom: 0 !important;
      overflow: visible !important;
    }

    .home-right-content p {
      font-family: 'Helvetica Light', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
      font-size: clamp(11.3px, 2.5vw, 11.9px) !important;
      line-height: 1.42 !important;
      overflow-wrap: anywhere;
      margin: 0 0 7px 0 !important;
    }

    .home-right-button {
      padding-top: 8px !important;
      flex-shrink: 0;
      margin-top: 0 !important;
    }

    .home-right-button button {
      font-family: 'Helvetica Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 7.5px !important;
      padding: 6px 22px !important;
      letter-spacing: 1.2px !important;
    }
  }

  @media (min-width: 640px) and (max-width: 1023px) {
    .home-left-page,
    .home-right-page {
      padding-left: 16px !important;
      padding-right: 16px !important;
    }

    .about-copy-container {
      max-width: 100%;
    }
  }

  /* =========================================
     LAPTOP / SMALL DESKTOP  (1024px – 1279px)
     Matches the reference book spread:
     - manual line breaks are kept
     - page padding is proportional to the page width
     - top and bottom padding are equal
     - RIGHT PAGE: taller line height inside each
       paragraph, small fixed gap between paragraphs
       (no space-between stretching), so the copy fills
       the height down to the button
     ========================================= */

  @media (min-width: 1024px) and (max-width: 1279px) {
    .home-left-page,
    .home-right-page {
      container-type: inline-size;
      box-sizing: border-box;
      min-width: 0;
      padding-top: clamp(14px, 2.4vh, 24px) !important;
      padding-bottom: clamp(14px, 2.4vh, 24px) !important;
    }

    /* Left page: wider inner margin, "About" line runs to the right margin */
    .home-left-page {
      padding-left: 20% !important;
      padding-right: 12% !important;
    }

    /* Right page: text column sits inside the same proportions */
    .home-right-page {
      padding-left: 12% !important;
      padding-right: 20% !important;
    }

    .home-left-header {
      height: auto !important;
      min-height: 22px;
      margin-bottom: clamp(10px, 1.8vh, 18px) !important;
    }

    .home-left-header h2 {
      font-size: 17px !important;
      font-size: clamp(17px, 6cqw, 21px) !important;
    }

    .about-copy-container {
      width: 100%;
      max-width: 100% !important;
      min-width: 0;
      overflow: visible;
      flex: 1 1 auto;
    }

    /* keep the manual line breaks visible, like the reference */
    .about-copy-break {
      display: inline;
    }

    .home-left-content,
    .home-right-content {
      width: 100%;
      min-width: 0;
      overflow: visible !important;
      justify-content: flex-start !important;
    }

    /* LEFT PAGE paragraphs: line height + paragraph gap */
    .home-left-content p,
    .home-right-content p {
      font-size: 11.7px !important;
      font-size: clamp(10.5px, 3.7cqw, 12.5px) !important;
      line-height: 1.7 !important;
      margin: 0 0 16px 0 !important;
      max-width: 100%;
      overflow-wrap: break-word;
      word-break: normal;
    }

    /* no extra space after the last paragraph, so the bottom margin stays equal */
    .home-left-content p:last-child,
    .home-right-content p:last-child {
      margin-bottom: 0 !important;
    }

    /* RIGHT PAGE — taller lines inside paragraphs, SMALL gap between
       paragraphs. Content is packed from the top (flex-start), and the
       taller line height is what fills the page down to the button. */
    .home-right-content {
      flex: 1 1 auto;
      justify-content: flex-start !important;
      gap: 12px !important;
    }

    .home-right-content p {
      line-height: 1.95 !important;
      margin: 0 !important;
    }

    /* Button sits under the content with a small fixed gap */
    .home-right-button {
      padding-top: clamp(12px, 2vh, 20px) !important;
      padding-bottom: 0 !important;
      margin-top: 0;
      flex-shrink: 0;
    }

    .home-right-button button {
      width: 75%;
      max-width: 230px;
      font-size: 9px !important;
      font-size: clamp(8.5px, 2.9cqw, 10.5px) !important;
      padding: 8px 0 !important;
      letter-spacing: 1.6px !important;
      white-space: nowrap;
    }
  }

  /* =========================================
     SMALL MOBILE
     ========================================= */

  @media (max-width: 480px) {
    .home-left-content,
    .home-right-content {
      gap: 0 !important;
      overflow: visible !important;
    }

    .home-left-content {
      justify-content: flex-start !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      transform: none !important;
    }

    .home-left-content p {
      font-family: 'Helvetica Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: clamp(11.3px, 2.7vw, 11.8px) !important;
      line-height: 1.40 !important;
      margin: 0 0 7px 0 !important;
    }

    .home-right-content {
      padding-bottom: 0 !important;
      overflow: visible !important;
    }

    .home-right-content p {
      font-family: 'Helvetica Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: clamp(11.3px, 2.7vw, 11.8px) !important;
      line-height: 1.40 !important;
      margin: 0 0 7px 0 !important;
    }

    .home-right-button button {
      font-family: 'Helvetica Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 7px !important;
      padding: 5px 20px !important;
      letter-spacing: 1px !important;
    }
  }

  /* =========================================
     VERY SMALL MOBILE
     ========================================= */

  @media (max-width: 380px) {
    .home-left-content,
    .home-right-content {
      gap: 0 !important;
      overflow: visible !important;
    }

    .home-left-content {
      justify-content: flex-start !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      transform: none !important;
    }

    .home-left-content p {
      font-family: 'Helvetica Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: clamp(11.1px, 2.8vw, 11.6px) !important;
      line-height: 1.38 !important;
      margin: 0 0 6px 0 !important;
    }

    .home-right-content {
      padding-bottom: 0 !important;
      overflow: visible !important;
    }

    .home-right-content p {
      font-family: 'Helvetica Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: clamp(11.1px, 2.8vw, 11.6px) !important;
      line-height: 1.38 !important;
      margin: 0 0 6px 0 !important;
    }

    .home-right-button button {
      font-family: 'Helvetica Light', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 6.5px !important;
      padding: 4px 18px !important;
      letter-spacing: 0.8px !important;
    }
  }

  /* =====================================================================
    1242px+ — TWO-PAGE SPREAD ONLY (KEEP THIS BLOCK LAST)

     - Same top and bottom margin on both pages (--sp-pad-y)
     - Page margins scale with page width; Home.jsx measures the real
       line counts so the text and button continue to fit as it scales.
     - Line height is calculated so the last line (left) / the button
       (right) lands exactly on the bottom margin
     - Text block is NOT stretched; the button is pinned to the bottom, so
       text can never overlap the button

     TUNING:
       --sp-ls        letter spacing
       --sp-lh-k      line height multiplier (lower = tighter lines)
       --sp-pad-y     top / bottom margin
       --sp-gap       gap between paragraphs
      --sp-n-left    number of text lines on the LEFT page  (fallback 16;
                      Home.jsx counts the real lines and overrides it)
      --sp-n-right   number of text lines on the RIGHT page (fallback 16;
                      Home.jsx counts the real lines and overrides it)
     ===================================================================== */

  @supports (width: 1cqw) {
    @media (min-width: 1242px) {
      .book-wrapper:not(.is-portrait) .about-responsive {
        container-type: size;
        --sp-fs: clamp(10px, 3.1cqw, 24px);
        --sp-pad-y: 9.8cqw;
        --sp-gap: calc(var(--sp-fs) * 0.6);
        --sp-btn-gap: calc(var(--sp-fs) * 1.5);
        --sp-btn-h: calc(var(--sp-fs) * 2.3);
        --sp-n-left: 16;
        --sp-n-right: 16;

        /* left = heading + n lines + 1 gap */
        --sp-lh-left: min(
          calc(var(--sp-fs) * 3.2),
          max(
            calc(var(--sp-fs) * 1.5),
            calc(
              (100cqh - 2 * var(--sp-pad-y) - var(--sp-fs) * 3.395 - var(--sp-gap))
              / (var(--sp-n-left) - 0.5)
            )
          )
        );

        /* right = n lines + 2 gaps + button gap + button */
        --sp-lh-right: min(
          calc(var(--sp-fs) * 3.2),
          max(
            calc(var(--sp-fs) * 1.5),
            calc(
              (100cqh - 2 * var(--sp-pad-y) - var(--sp-fs) * 0.5 - 2 * var(--sp-gap) - var(--sp-btn-gap) - var(--sp-btn-h))
              / (var(--sp-n-right) - 0.5)
            )
          )
        );

        /* ---- TEXT FEEL (tune here) ------------------------------------
           --sp-ls     letter spacing (in em, so the text wraps the same at every book size)
           --sp-lh-k   line height multiplier (1 = the full calculated
                       height, 0.96 = a little tighter)
           The height the tighter lines free up is handed to the paragraph
           gap / heading gap, so the top and bottom margins do not move. */
        --sp-ls: 0.019em;
        --sp-lh-k: 0.96;
        --sp-lh-adj-l: 0px; /* set by Home.jsx so the left text ends exactly on the bottom margin */
        --sp-lhl: calc(var(--sp-lh-left) * var(--sp-lh-k) + var(--sp-lh-adj-l));
        --sp-lhr: calc(var(--sp-lh-right) * var(--sp-lh-k));
        --sp-extra-left: calc(var(--sp-lh-left) * (1 - var(--sp-lh-k)) * var(--sp-n-left));
        --sp-extra-right: calc(var(--sp-lh-right) * (1 - var(--sp-lh-k)) * var(--sp-n-right));
      }

      /* Pages: full height */
      .book-wrapper:not(.is-portrait) .about-responsive .home-left-page,
      .book-wrapper:not(.is-portrait) .about-responsive .home-right-page {
        container-type: normal !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 0 !important;
        max-height: none !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
      }

      /* Left page: full-width text column (3% each side), heading at the top margin */
      .book-wrapper:not(.is-portrait) .about-responsive .home-left-page {
        padding-left: var(--sp-pad-y) !important;
        padding-right: var(--sp-pad-y) !important;
        padding-top: var(--sp-pad-y) !important;
        padding-bottom: max(0px, calc(var(--sp-pad-y) - (var(--sp-lhl) - var(--sp-fs)) / 2)) !important;
      }

      /* Right page: first line at the top margin, button at the bottom margin */
      .book-wrapper:not(.is-portrait) .about-responsive .home-right-page {
        padding-left: var(--sp-pad-y) !important;
        padding-right: var(--sp-pad-y) !important;
        padding-top: max(0px, calc(var(--sp-pad-y) - (var(--sp-lhr) - var(--sp-fs)) / 2)) !important;
        padding-bottom: var(--sp-pad-y) !important;
      }

      /* Heading */
      .book-wrapper:not(.is-portrait) .about-responsive .home-left-header {
        height: auto !important;
        min-height: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        margin-bottom: calc(var(--sp-fs) * 1.3 + var(--sp-extra-left) / 2) !important;
        flex-shrink: 0;
      }

      .book-wrapper:not(.is-portrait) .about-responsive .home-left-header h2 {
        font-size: calc(var(--sp-fs) * 1.45) !important;
        line-height: 1.1 !important;
      }

      /* Text column: sized by its content (NOT stretched) */
      .book-wrapper:not(.is-portrait) .about-responsive .about-copy-container {
        display: flex !important;
        flex-direction: column !important;
        flex: 0 0 auto !important;
        width: 100% !important;
        max-width: 100% !important;
        min-height: 0 !important;
        overflow: visible !important;
        padding: 0;
        margin: 0;
      }

      .book-wrapper:not(.is-portrait) .about-responsive .home-left-content,
      .book-wrapper:not(.is-portrait) .about-responsive .home-right-content {
        display: flex !important;
        flex-direction: column !important;
        flex: 0 0 auto !important;
        justify-content: flex-start !important;
        gap: var(--sp-gap) !important;
        width: 100% !important;
        min-height: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
        transform: none !important;
      }

      /* paragraph gap = base gap + a share of the height freed by the tighter lines */
      .book-wrapper:not(.is-portrait) .about-responsive .home-left-content {
        gap: calc(var(--sp-gap) + var(--sp-extra-left) / 2) !important;
      }

      .book-wrapper:not(.is-portrait) .about-responsive .home-right-content {
        gap: calc(var(--sp-gap) + var(--sp-extra-right) / 3) !important;
      }

      /* Paragraphs */
      .book-wrapper:not(.is-portrait) .about-responsive .home-left-content p,
      .book-wrapper:not(.is-portrait) .about-responsive .home-right-content p {
        font-size: var(--sp-fs) !important;
        letter-spacing: var(--sp-ls) !important;
        margin: 0 !important;
        max-width: 100% !important;
        text-align: left;
        overflow-wrap: break-word;
        word-break: normal !important;
        hyphens: manual;
      }

      .book-wrapper:not(.is-portrait) .about-responsive .home-left-content p {
        line-height: var(--sp-lhl) !important;
      }

      .book-wrapper:not(.is-portrait) .about-responsive .home-right-content p {
        line-height: var(--sp-lhr) !important;
      }

      /* Natural wrapping: hide manual desktop line breaks */
      .book-wrapper:not(.is-portrait) .about-responsive .about-copy-break {
        display: none !important;
      }

      /* START A PROJECT: pinned to the bottom margin, always below the text */
      .book-wrapper:not(.is-portrait) .about-responsive .home-right-button {
        flex-shrink: 0;
        margin-top: auto !important;
        padding-top: calc(var(--sp-btn-gap) + var(--sp-extra-right) / 3) !important;
        padding-bottom: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        position: relative;
        z-index: 2;
      }

      .book-wrapper:not(.is-portrait) .about-responsive .home-right-button button {
        box-sizing: border-box;
        width: 75%;
        max-width: calc(var(--sp-fs) * 17);
        height: var(--sp-btn-h);
        padding: 0 !important;
        line-height: 1 !important;
        font-size: clamp(9px, calc(var(--sp-fs) * 0.68), 13px) !important;
        letter-spacing: 1.8px !important;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  /* =====================================================================
     SINGLE-PAGE (PORTRAIT) MODE — EVEN LEFT / RIGHT EDGES
     (phones, tablets and any layout where .book-wrapper has .is-portrait)

     - The left and right padding of the page are ALWAYS the same value
       (--ab-pad-x), so the text sits with an equal margin on both sides
       and can never touch or run past the page edge.
     - Text is justified: every line starts on the same left edge AND ends
       on the same right edge. The last line of each paragraph stays
       left-aligned, and automatic hyphenation keeps the word spacing even.
     The two-page desktop spread (.is-portrait absent) is not affected.
     ===================================================================== */

  .book-wrapper.is-portrait .about-responsive .home-left-page.home-left-page,
  .book-wrapper.is-portrait .about-responsive .home-right-page.home-right-page {
    padding-left: var(--ab-pad-x) !important;
    padding-right: var(--ab-pad-x) !important;
    box-sizing: border-box !important;
  }

  .book-wrapper.is-portrait .about-responsive .home-left-content p,
  .book-wrapper.is-portrait .about-responsive .home-right-content p {
    text-align: justify !important;
    text-align-last: left !important;
    text-justify: inter-word;
    hyphens: auto !important;
    -webkit-hyphens: auto !important;
    overflow-wrap: break-word;
    word-break: normal !important;
    width: 100%;
    max-width: 100% !important;
    box-sizing: border-box;
  }

  /* =====================================================================
     RIGHT PAGE, SINGLE-PAGE (PORTRAIT) MODE — LARGER TEXT
     The right page text is a little bigger than the left page text
     (--ab-fs-scale, set by Home.jsx: 1.12 down to 1 so it always fits
     above the START A PROJECT button). Default 1.1 if the script has
     not run yet.
     ===================================================================== */

  .book-wrapper.is-portrait .about-responsive.about-right .home-right-content p {
    font-size: calc(var(--ab-fs) * var(--ab-fs-scale, 1.1)) !important;
  }
`;

/* =========================================================
   EXPORT
   ========================================================= */

export default function Home({ isLeft, isLeftPage, onStartProject }) {
  const isLeftSpread = isLeft !== undefined ? isLeft : isLeftPage;
  return (
    <>
      <style>{responsiveStyle}</style>

      {isLeftSpread ? <HomeLeft /> : <HomeRight onStartProject={onStartProject} />}
    </>
  );
}