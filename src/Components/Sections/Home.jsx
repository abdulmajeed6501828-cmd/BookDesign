import React from "react";

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
  const [beforeMarketReady, afterMarketReady] = text.split(" market-ready");
  const [beforePublishers, afterPublishers] = beforeMarketReady.split(" publishers");
  const [beforeInclude, afterInclude] = afterMarketReady.split(" include");
  const [beforeEbook, afterEbook] = afterInclude.split(" ebook");
  const [beforeBookMockups, afterBookMockups] = afterEbook.split(" book mockups");
  const [beforePublishing, afterPublishing] = afterBookMockups.split(" publishing");
  return (
    <>
      {withItalicBrand(beforePublishers)}
      <br className="about-copy-break" />{" "}
      publishers{beforeInclude}
      <br className="about-copy-break" />{" "}
      market-ready{beforeInclude}
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
      <br className="about-copy-break" />
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
   LEFT PAGE — ABOUT LEFT
   ========================================================= */

const HomeLeft = () => (
  <div
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

/* =========================================================
   RIGHT PAGE — ABOUT RIGHT
   ========================================================= */

const HomeRight = ({ onStartProject }) => (
  <div
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
