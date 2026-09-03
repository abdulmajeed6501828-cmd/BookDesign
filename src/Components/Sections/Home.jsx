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
            fontWeight: 600,
            color: "#4a4238",
          }}
        >
          AAFI Designs
        </em>
      )}
    </React.Fragment>
  ));

/* =========================================================
   BASE STYLES
   ========================================================= */

const FONT = "'Helvetica Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const PAGE = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: 0,
  width: "100%",
  boxSizing: "border-box",
  overflow: "hidden",
  padding: "clamp(12px, 2.5vh, 20px) clamp(16px, 3.5%, 24px)",
};

const PARA_LEFT = {
  margin: 0,
  fontFamily: FONT,
  fontWeight: 300,
  fontSize: "clamp(11.8px, 1.52vh, 13.2px)",
  lineHeight: 1.62,
  color: "#2a2520",
};

const PARA = {
  margin: 0,
  fontFamily: FONT,
  fontWeight: 300,
  fontSize: "clamp(11px, 1.42vh, 12.5px)",
  lineHeight: 1.6,
  color: "#2a2520",
};

const PARA_RIGHT = {
  margin: 0,
  fontFamily: FONT,
  fontWeight: 300,
  fontSize: "clamp(10.5px, 1.35vh, 12px)",
  lineHeight: 1.55,
  color: "#2a2520",
};

/* =========================================================
   LEFT PAGE
   FIRST FLIP — INTRODUCTION LEFT PAGE
   ========================================================= */

const HomeLeft = () => (
  <div
    style={{
      ...PAGE,
      justifyContent: "flex-start",
    }}
  >
    {/* HEADING */}
    <div
      style={{
        flexShrink: 0,
        marginBottom: "12px",
      }}
    >
      <h2
        style={{
          margin: "4px 0 6px 0",
          fontFamily: FONT,
          fontWeight: 400,
          fontSize: "clamp(22px, 3vh, 28px)",
          lineHeight: 1,
          letterSpacing: "0.3px",
          color: "#1a1a1a",
        }}
      >
        Introduction
      </h2>

      {/* GOLD UNDERLINE */}
      <div
        style={{
          height: "2px",
          width: "40px",
          backgroundColor: "#b39a69",
        }}
      />
    </div>

    {/* LEFT CONTENT */}
    <div
      className="home-left-content"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "14px",
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
        paddingTop: "4px",
      }}
    >
      <p style={PARA_LEFT}>{withItalicBrand(L1)}</p>

      <p style={PARA_LEFT}>{L2}</p>
    </div>
  </div>
);

/* =========================================================
   RIGHT PAGE
   SECOND FLIP — INTRODUCTION RIGHT PAGE
   ========================================================= */

const HomeRight = ({ onStartProject }) => (
  <div
    style={{
      ...PAGE,
      justifyContent: "flex-start",
    }}
  >
    {/* RIGHT CONTENT - STARTS AT SAME TOP POSITION AS LEFT HEADING */}
    <div
      className="home-right-content"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
        paddingTop: "4px",
      }}
    >
      {/* TEXT CONTENT GROUP */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "9px",
        }}
      >
        {/* FIRST PARAGRAPH */}
        <p style={PARA_LEFT}>{withItalicBrand(R1)}</p>

        {/* SECOND PARAGRAPH */}
        <p style={PARA_LEFT}>{withItalicBrand(R2)}</p>

        {/* QUOTE */}
        <p
          style={{
            ...PARA_LEFT,
            fontStyle: "italic",
            color: "#4a4238",
          }}
        >
          {CL}
        </p>
      </div>

      {/* BUTTON - LET'S START (ALIGNED WITH BOTTOM OF LEFT PAGE TEXT) */}
      <div
        style={{
          paddingTop: "6px",
          paddingBottom: "2px",
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
            fontWeight: 500,
            fontSize: "clamp(8.5px, 1.05vh, 10px)",
            letterSpacing: "1.5px",
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
          LET'S START
        </button>
      </div>
    </div>
  </div>
);

/* =========================================================
   MOBILE RESPONSIVE STYLES
   DESKTOP REMAINS UNCHANGED
   ========================================================= */

const responsiveStyle = `
  /* =========================================
     MOBILE
     ========================================= */

  @media (max-width: 639px) {

    /* LEFT PAGE */
    .home-left-content {
      gap: 9px !important;
      justify-content: flex-start !important;
      padding-top: 5px !important;
      padding-bottom: 10px !important;
      transform: translateY(8px) !important;
    }

    .home-left-content p {
      font-family: 'Helvetica Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
      font-size: 11px !important;
      line-height: 1.72 !important;
    }

    /* RIGHT PAGE */
    .home-right-content {
      gap: 9px !important;
      justify-content: flex-start !important;
      padding-bottom: 45px !important;
    }

    .home-right-content p {
      font-family: 'Helvetica Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
      font-size: 11px !important;
      line-height: 1.62 !important;
    }

    .home-right-content button {
      font-family: 'Helvetica Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
      font-size: 7.5px !important;
      padding: 6px 22px !important;
      letter-spacing: 1.2px !important;
    }
  }

  /* =========================================
     SMALL MOBILE
     ========================================= */

  @media (max-width: 480px) {

    .home-left-content {
      gap: 8px !important;
      justify-content: flex-start !important;
      padding-top: 5px !important;
      padding-bottom: 8px !important;
      transform: translateY(8px) !important;
    }

    .home-left-content p {
      font-family: 'Helvetica Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
      font-size: 11.5px !important;
      line-height: 1.7 !important;
    }

    .home-right-content {
      gap: 8px !important;
      padding-bottom: 40px !important;
    }

    .home-right-content p {
      font-family: 'Helvetica Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
      font-size: 11.5px !important;
      line-height: 1.58 !important;
    }

    .home-right-content button {
      font-family: 'Helvetica Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
      font-size: 7px !important;
      padding: 5px 20px !important;
      letter-spacing: 1px !important;
    }
  }

  /* =========================================
     VERY SMALL MOBILE
     ========================================= */

  @media (max-width: 380px) {

    .home-left-content {
      gap: 7px !important;
      justify-content: flex-start !important;
      padding-top: 4px !important;
      padding-bottom: 8px !important;
      transform: translateY(-5px) !important;
    }

    .home-left-content p {
      font-family: 'Helvetica Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
      font-size: 11px !important;
      line-height: 1.68 !important;
    }

    .home-right-content {
      gap: 7px !important;
      padding-bottom: 35px !important;
    }

    .home-right-content p {
      font-family: 'Helvetica Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
      font-size: 11px !important;
      line-height: 1.55 !important;
    }

    .home-right-content button {
      font-family: 'Helvetica Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
      font-size: 6.5px !important;
      padding: 4px 18px !important;
      letter-spacing: 0.8px !important;
    }
  }
`;

/* =========================================================
   EXPORT
   ========================================================= */

export default function Home({ isLeft, onStartProject }) {
  return (
    <>
      <style>{responsiveStyle}</style>

      {isLeft ? <HomeLeft /> : <HomeRight onStartProject={onStartProject} />}
    </>
  );
}