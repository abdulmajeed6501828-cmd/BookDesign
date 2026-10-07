import React, { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

import BookPage from "./BookPage";

import Home from "../Sections/Home";
import About from "../Sections/About";
import Portfolio from "../Sections/Portfolio";

import Pricing from "../Sections/Pricing";
import Contact from "../Sections/Contact";
import Testimonials from "../Sections/Testimonials";

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
import StartProjectModal from "../Modals/StartProjectModal";

/* =========================================================
   EXTERNAL LINK HELPER + SOCIAL LINKS
   Used by the landing overlay (top right). Built with
   React.createElement so the <a> markup lives in one clean place.
   ========================================================= */

const ExternalLink = ({ href, className, label, children }) =>
  React.createElement(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      className,
      "aria-label": label,
    },
    children,
  );

const SOCIAL_LINKS = [
  {
    key: "facebook",
    href: "https://www.facebook.com/aafidesigns.official",
    label: "Facebook",
    Icon: FaFacebookF,
  },
  {
    key: "instagram",
    href: "https://www.instagram.com/aafi.designs/",
    label: "Instagram",
    Icon: FaInstagram,
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/aaftabsheikh/",
    label: "LinkedIn",
    Icon: FaLinkedinIn,
  },
];

/* =========================================================
   BACK COVER STYLE — "Behind the Cover"
   Matches the NEW reference design on every screen size:
     - larger photo, thin gold ring sitting close to the photo
     - narrower, centered text column with comfortable line height
     - clear gap between the text and the ISBN box
     - larger ISBN box
   The breakpoint structure (which rule applies on which device)
   is unchanged — only the values inside each block were updated,
   so the responsiveness of each device range stays separate.
   ========================================================= */

const backCoverResponsiveStyle = `
  /* ---------- SHARED LOOK (all devices) ----------
     Thin gold ring hugging the photo (no thick black gap),
     ISBN image always fills its white box exactly. */
  .book-cover.back-cover .bc-photo-ring {
    border: 3px solid #caa855;
    padding: 2px;
    background: transparent;
    box-shadow: none;
  }

  .book-cover.back-cover .bc-isbn {
    width: 100% !important;
    max-height: none !important;
    height: auto !important;
  }

  @media (max-width: 767px) {
    .book-cover.back-cover .bc-layout {
      padding: 26px 10px 26px;          /* top / bottom margin */
      justify-content: center;          /* compact block, centered in the cover */
      gap: 0;
      overflow: visible;
    }

    .book-cover.back-cover .bc-title-area {
      margin-top: 0;
      margin-bottom: 10px;
    }

    .book-cover.back-cover .bc-title {
      font-size: clamp(15px, 2.7vw, 18px) !important;
    }

    .book-cover.back-cover .bc-photo-area {
      margin-top: 0;
      margin-bottom: 10px;
    }

    .book-cover.back-cover .bc-photo-ring {
      padding: 2px;
      border-width: 2.5px;
    }

    .book-cover.back-cover .bc-photo {
      width: clamp(76px, 17vw, 92px) !important;
      height: clamp(76px, 17vw, 92px) !important;
    }

    /* bio is compact: it only takes the height of its text,
       paragraphs sit close together (no stretched gaps) */
    .book-cover.back-cover .bc-bio-area {
      flex: 0 0 auto;
      min-height: 0;
      overflow: visible;
      justify-content: flex-start;
      gap: 8px;
    }

    .book-cover.back-cover .bc-para {
      font-size: clamp(8.5px, 2.2vw, 10.5px) !important;
      line-height: 1.5 !important;
      padding: 0 16% !important;        /* narrow column like the reference */
    }

    .book-cover.back-cover .bc-bottom-area {
      margin-top: 16px;
      margin-bottom: 0;
    }

    .book-cover.back-cover .bc-isbn-box {
      width: min(132px, 50vw) !important;
      max-width: 50vw !important;
      padding: 0 !important;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .book-cover.back-cover .bc-layout {
      padding: 16px;
      gap: 8px;
    }

    .book-cover.back-cover .bc-title {
      font-size: clamp(16px, 2vw, 20px) !important;
    }

    .book-cover.back-cover .bc-photo {
      width: clamp(84px, 12vw, 104px) !important;
      height: clamp(84px, 12vw, 104px) !important;
    }

    .book-cover.back-cover .bc-para {
      font-size: clamp(8.5px, 1.35vw, 10px) !important;
      line-height: 1.4 !important;
      padding: 0 12% !important;
    }

    .book-cover.back-cover .bc-isbn-box {
      width: clamp(110px, 30%, 150px) !important;
      max-width: 40% !important;
    }
  }

  @media (max-width: 480px) {
    .book-cover.back-cover .bc-layout {
      padding: 22px 8px 22px;           /* top / bottom margin */
      justify-content: center;
    }

    .book-cover.back-cover .bc-photo {
      width: clamp(64px, 18vw, 78px) !important;
      height: clamp(64px, 18vw, 78px) !important;
    }

    .book-cover.back-cover .bc-title {
      font-size: clamp(14px, 3vw, 16px) !important;
    }

    .book-cover.back-cover .bc-para {
      font-size: clamp(8.5px, 2.3vw, 10px) !important;
      line-height: 1.47 !important;
      padding: 0 15% !important;        /* narrow column like the reference */
    }

    .book-cover.back-cover .bc-isbn-box {
      width: min(124px, 52vw) !important;
      max-width: 52vw !important;
    }
  }

  /* TALL PHONES (≤ 500px wide AND ≥ 760px high, e.g. iPhone 14/15/16 Pro Max)
     ONE compact block, centered in the cover: the gaps between title,
     photo, bio and ISBN are small FIXED values (nothing is stretched
     apart), so any free height ends up as an equal margin above and
     below the block. The text / photo / ISBN are scaled from the cover
     size so the block fills as much of the height as the phone allows.
     Shorter phones (iPhone SE etc.) keep the compact layout above. */
  @media (max-width: 500px) and (min-height: 760px) {
    .book-cover.back-cover .bc-layout {
      padding: clamp(22px, 4.5cqh, 44px) 8px clamp(22px, 4.5cqh, 44px);   /* top / bottom space */
      justify-content: center;          /* equal margin above and below the block */
    }

    .book-cover.back-cover .bc-title-area {
      margin-bottom: clamp(14px, 2cqh, 22px);
    }

    .book-cover.back-cover .bc-title {
      font-size: clamp(16px, 3.2cqh, 21px) !important;
    }

    .book-cover.back-cover .bc-photo {
      width: clamp(78px, 16.5cqh, 150px) !important;
      height: clamp(78px, 16.5cqh, 150px) !important;
    }

    .book-cover.back-cover .bc-photo-area {
      margin-bottom: clamp(18px, 2.4cqh, 28px);
    }

    .book-cover.back-cover .bc-bio-area {
      flex: 0 0 auto;                   /* only as tall as the text */
      justify-content: flex-start;
      gap: clamp(12px, 1.6cqh, 18px);   /* gap between paragraphs */
      padding: 0;
    }

    .book-cover.back-cover .bc-para {
      font-size: clamp(9.5px, min(2.6cqw, 1.5cqh), 15px) !important;   /* scales with the book */
      line-height: 1.6 !important;
      padding: 0 17% !important;        /* narrower text column, like the reference */
    }

    .book-cover.back-cover .bc-bottom-area {
      margin-top: clamp(22px, 3cqh, 36px);   /* clear gap between text and ISBN */
    }

    /* bigger ISBN box */
    .book-cover.back-cover .bc-isbn-box {
      width: clamp(130px, 38%, 190px) !important;
      max-width: 50% !important;
    }
  }

  /* TALL TABLETS (768px – 1023px wide AND ≥ 760px high, e.g. iPad Mini /
     iPad Air in portrait). Same idea as tall phones: ONE compact block,
     centered in the cover, with small fixed gaps between the sections
     and an equal margin above and below. Title / photo / text / ISBN
     scale from the cover size so the content fills the full height.
     Only affects this size range; phones and desktop are untouched. */
  @media (min-width: 768px) and (max-width: 1023px) and (min-height: 760px) {
    .book-cover.back-cover .bc-layout {
      padding: clamp(28px, 4.5cqh, 48px) 16px clamp(28px, 4.5cqh, 48px);   /* top / bottom space */
      justify-content: center;
      gap: 0;
    }

    .book-cover.back-cover .bc-title-area {
      margin-bottom: clamp(18px, 2.2cqh, 26px);
    }

    .book-cover.back-cover .bc-title {
      font-size: clamp(18px, 3.2cqh, 28px) !important;
    }

    .book-cover.back-cover .bc-photo {
      width: clamp(90px, 16.5cqh, 170px) !important;
      height: clamp(90px, 16.5cqh, 170px) !important;
    }

    .book-cover.back-cover .bc-photo-area {
      margin-bottom: clamp(22px, 2.6cqh, 32px);
    }

    .book-cover.back-cover .bc-bio-area {
      flex: 0 0 auto;
      justify-content: flex-start;
      gap: clamp(12px, 1.5cqh, 18px);
      padding: 0;
    }

    .book-cover.back-cover .bc-para {
      font-size: clamp(11px, min(2.2cqw, 1.5cqh), 17px) !important;   /* scales with the book */
      line-height: 1.65 !important;
      padding: 0 18% !important;
    }

    .book-cover.back-cover .bc-bottom-area {
      margin-top: clamp(26px, 3.2cqh, 40px);
    }

    .book-cover.back-cover .bc-isbn-box {
      width: clamp(150px, 33%, 230px) !important;
      max-width: 42% !important;
    }
  }

  /* DESKTOP ≥ 1024px ONLY (two-page book, laptops / desktops / Nest Hub).
     ONE compact, centered block: title, photo, bio and ISBN sit together
     with small fixed gaps (nothing is stretched apart), and the free
     height becomes an equal margin above and below. Photo, text and ISBN
     scale from the cover size, so the content fills the full height on
     every desktop size. Phones / tablets are untouched. */
  @media (min-width: 1024px) {
    .book-cover.back-cover .bc-layout {
      padding: clamp(22px, 4.5cqh, 44px) 16px clamp(22px, 4.5cqh, 44px);   /* equal top / bottom space */
      justify-content: center;
      gap: 0;
    }

    .book-cover.back-cover .bc-title-area {
      margin-bottom: clamp(14px, 2.4cqh, 26px);
    }

    .book-cover.back-cover .bc-title {
      font-size: clamp(16px, 3.1cqh, 28px) !important;
    }

    .book-cover.back-cover .bc-photo {
      width: clamp(64px, 17.5cqh, 170px) !important;
      height: clamp(64px, 17.5cqh, 170px) !important;
    }

    .book-cover.back-cover .bc-photo-area {
      margin-bottom: clamp(18px, 2.6cqh, 30px);
    }

    .book-cover.back-cover .bc-bio-area {
      flex: 0 0 auto;                   /* only as tall as the text */
      justify-content: flex-start;
      gap: clamp(10px, 1.6cqh, 18px);   /* gap between paragraphs */
      padding: 0;
    }

    .book-cover.back-cover .bc-para {
      font-size: clamp(8px, min(2.2cqw, 1.45cqh), 17px) !important;   /* scales with the book */
      line-height: 1.55 !important;
      padding: 0 19% !important;        /* narrower text column, like the reference */
    }

    .book-cover.back-cover .bc-bottom-area {
      margin-top: clamp(22px, 3cqh, 38px);   /* clear gap between text and ISBN */
    }

    .book-cover.back-cover .bc-isbn-box {
      width: clamp(120px, 34%, 220px) !important;
      max-width: 44% !important;
    }
  }

  /* TALL PAGES ON TABLETS / LARGE SCREENS (≥ 768px wide, e.g. iPad Pro,
     Surface Pro, iPad Air in portrait). When the screen is wide but the
     book is a single tall page, the desktop / tablet rules above would
     leave the content small with big empty bands (or stretch it apart).
     This block detects the shape of the COVER itself (aspect ratio
     below 0.68) and uses the same compact, centered layout as tall
     phones / tablets, with everything scaled from the cover size so the
     content fills the full height with an equal, small top / bottom
     margin. It must stay AFTER the desktop block so it wins. A normal
     desktop two-page book (aspect ≈ 0.76) is not affected. */
  @media (min-width: 768px) {
    @container (max-aspect-ratio: 68/100) {
      .book-cover.back-cover .bc-layout {
        padding: clamp(24px, 3.8cqh, 50px) 16px clamp(24px, 3.8cqh, 50px);   /* equal top / bottom space */
        justify-content: center;
        gap: 0;
      }

      .book-cover.back-cover .bc-title-area {
        margin-bottom: clamp(18px, 2.4cqh, 32px);
      }

      .book-cover.back-cover .bc-title {
        font-size: clamp(18px, 3.2cqh, 42px) !important;
      }

      .book-cover.back-cover .bc-photo {
        width: clamp(88px, 18cqh, 240px) !important;
        height: clamp(88px, 18cqh, 240px) !important;
      }

      .book-cover.back-cover .bc-photo-area {
        margin-bottom: clamp(24px, 2.8cqh, 40px);
      }

      .book-cover.back-cover .bc-bio-area {
        flex: 0 0 auto;
        justify-content: flex-start;
        gap: clamp(12px, 1.6cqh, 22px);
        padding: 0;
      }

      .book-cover.back-cover .bc-para {
        font-size: clamp(11px, min(2.4cqw, 1.5cqh), 22px) !important;   /* scales with the book */
        line-height: 1.7 !important;                                     /* comfortable line height */
        padding: 0 18% !important;
      }

      .book-cover.back-cover .bc-bottom-area {
        margin-top: clamp(26px, 3.4cqh, 48px);
      }

      .book-cover.back-cover .bc-isbn-box {
        width: clamp(150px, 34%, 270px) !important;
        max-width: 44% !important;
      }
    }
  }

  /* MEDIUM-TALL DESKTOP PAGES (≥ 1024px wide, cover aspect ratio between
     0.68 and 0.74, e.g. a 1024 x 1131 window). The page is taller than a
     normal two-page desktop cover but not tall enough for the block
     above, so the desktop rule left big empty bands above and below.
     Here the text, line height, photo, title and ISBN are scaled up so
     the content fills the full height with an equal top / bottom margin.
     It must stay at the very END so it wins over the desktop rule. */
  @media (min-width: 1024px) {
    @container (min-aspect-ratio: 68/100) and (max-aspect-ratio: 74/100) {
      .book-cover.back-cover .bc-layout {
        padding: clamp(24px, 4cqh, 46px) 16px clamp(24px, 4cqh, 46px);
      }

      .book-cover.back-cover .bc-title-area {
        margin-bottom: clamp(16px, 2.2cqh, 28px);
      }

      .book-cover.back-cover .bc-title {
        font-size: clamp(16px, 3.2cqh, 32px) !important;
      }

      .book-cover.back-cover .bc-photo {
        width: clamp(64px, 17.5cqh, 180px) !important;
        height: clamp(64px, 17.5cqh, 180px) !important;
      }

      .book-cover.back-cover .bc-photo-area {
        margin-bottom: clamp(20px, 2.6cqh, 34px);
      }

      .book-cover.back-cover .bc-bio-area {
        gap: clamp(10px, 1.5cqh, 20px);
      }

      .book-cover.back-cover .bc-para {
        font-size: clamp(8px, min(2.3cqw, 1.5cqh), 20px) !important;   /* scales with the book */
        line-height: 1.65 !important;
        padding: 0 18% !important;
      }

      .book-cover.back-cover .bc-bottom-area {
        margin-top: clamp(22px, 3cqh, 40px);
      }

      .book-cover.back-cover .bc-isbn-box {
        width: clamp(120px, 34%, 230px) !important;
      }
    }
  }
`;

/* =========================================================
   RESPONSIVE BOOK DIMENSIONS
   Every breakpoint follows the same rule: the book fills the
   full height between the navbar and the footer (measured
   from the real DOM) and the full width the viewport can hold
   (arrows included).

   Layout choice:
   - Phones (< 768px)                         → single page
   - Any screen where a two-page spread would
     make each page too narrow (tall / narrow
     screens such as 768x1013, 796x1013 ...)  → single page
   - Everything else                          → two-page spread

   PHONES (<= 500px):
   - The book is shorter than the free space (PHONE_HEIGHT_STEPS —
     the smaller the screen, the shorter the book) so there is a
     clear gap above and below.
   - The book is narrower (PHONE_SIDE_MARGIN) so there is a
     clear gap left and right.
   Nothing above 500px is affected by these two values.
   ========================================================= */

const BOOK_BREATHING = 16; // gap so the book never touches navbar / footer
const SPREAD_MIN_ASPECT = 0.6; // below this page shape → single-page mode

const PHONE_MAX_WIDTH = 500; // phones: 500px and below

/* SINGLE-PAGE MAX WIDTH
   In single-page mode the book width used to keep growing with the
   screen height on wide/tall viewports (700px → 1024px+), which
   stretched the book sideways. It is now capped so the book keeps
   the exact width it has at a 700px viewport (700 - 22px gutter)
   and simply stays centered on anything wider.
   Height is NOT affected by this value. */
const SINGLE_PAGE_MAX_WIDTH = 678;

/* TWO-PAGE SPREAD MAX PAGE WIDTH
   On wide screens (1460px and up) the page width used to keep growing
   with the viewport, which stretched the book sideways. Each page is now
   capped to the width it has at a 1460px viewport ((1460 - 160) / 2 = 650)
   so the book keeps that exact size and simply stays centered on anything
   wider. Book height and the single-page / spread decision are NOT
   affected by this value. */
const SPREAD_MAX_PAGE_WIDTH = 650;

/* DESKTOP PAGE SHAPE (width / height of one page)
   The book at a 1460px-wide, full-height screen is 650 x 853, which is
   a page shape of 650 / 853 = 0.762. On desktop screens that are not as
   tall (for example 1277 x 591), the width used to be tied to the height
   only, which made the book almost square. From 1024px up, the page width
   now follows the same 0.762 shape, so the book looks the same as at
   1460px. Book HEIGHT is NOT affected by this value. */
const DESKTOP_MIN_WIDTH = 1024;
const DESKTOP_PAGE_ASPECT = 650 / 853;
const PHONE_SIDE_MARGIN = 44; // total horizontal space left free on phones (22px each side)

/* PHONE HEIGHT RATIO PER BREAKPOINT
   book height / free height between navbar and footer.
   Lower number = shorter book = bigger gap above and below.
   Each row is [max viewport width, ratio]; the first row that
   matches the current width wins. Edit the numbers to fine-tune. */
const PHONE_HEIGHT_STEPS = [
  [320, 0.74], //          ≤ 320px
  [360, 0.76], //  321 – 360px
  [380, 0.78], //  361 – 380px
  [400, 0.8], //   381 – 400px
  [430, 0.84], //  401 – 430px
  [480, 0.85], //  431 – 480px
  [500, 0.86], //  481 – 500px
];

function getPhoneHeightRatio(vw) {
  for (let i = 0; i < PHONE_HEIGHT_STEPS.length; i++) {
    if (vw <= PHONE_HEIGHT_STEPS[i][0]) {
      return PHONE_HEIGHT_STEPS[i][1];
    }
  }
  return 0.86;
}

function getChromeHeights(vw) {
  const header = document.querySelector(".site-header");
  const footer = document.querySelector(".site-footer");

  /* Fallbacks are only used before the first paint */
  const fallbackHeader = vw < 768 ? 56 : 48;
  const fallbackFooter = vw < 768 ? 64 : 48;

  return {
    header: header ? header.offsetHeight : fallbackHeader,
    footer: footer ? footer.offsetHeight : fallbackFooter,
  };
}

function getBookDimensions() {
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;

  const isPhone = vw <= PHONE_MAX_WIDTH;

  const { header, footer } = getChromeHeights(vw);

  /* Space between navbar and footer */
  const stageH = Math.max(280, vh - header - footer);

  /* availH drives the book WIDTH and the layout choice — unchanged,
     so widths stay exactly as they were. */
  const availH = Math.max(280, stageH - BOOK_BREATHING);

  /* bookH is the actual book HEIGHT (the width is NOT affected).
     - Phones (<= 500px): the book takes getPhoneHeightRatio(vw) of the space
       between navbar and footer, leaving a clear gap above and below.
     - Larger screens: small padding that scales with the screen
       (20px – 40px on each side). */
  let bookH;

  if (isPhone) {
    bookH = Math.round(stageH * getPhoneHeightRatio(vw));
  } else {
    const padEach = Math.min(40, Math.max(20, Math.round(stageH * 0.035)));
    bookH = stageH - padEach * 2;
  }

  bookH = Math.max(280, bookH);

  /* Single-page mode: arrows sit INSIDE the book (see Book.css
     .is-portrait), so the only space to reserve is the wrapper
     padding + the container gutter + safety.
     On phones (<= 500px) a larger side margin is reserved so the
     book does not touch the screen edges. */
  const SIDE_SINGLE = isPhone ? PHONE_SIDE_MARGIN : 22;

  /* Two-page spread: arrows sit outside the book, reserve room for them */
  const SIDE_SPREAD = vw < 1024 ? 110 : 160;

  /* Page width if a two-page spread were used */
  const spreadPageW = Math.floor((vw - SIDE_SPREAD) / 2);
  const spreadTooNarrow = spreadPageW / availH < SPREAD_MIN_ASPECT;

  /* SINGLE PAGE (portrait) — phones + tall / narrow screens */
  if (vw < 768 || spreadTooNarrow) {
    const maxW = vw - SIDE_SINGLE;

    const w = Math.max(
      210,
      Math.min(maxW, Math.floor(availH * 0.85), SINGLE_PAGE_MAX_WIDTH),
    );
    const h = Math.max(290, bookH); /* full height minus top / bottom padding */

    return {
      width: w,
      height: h,
      portrait: true,
      desktop: false,
    };
  }

  /* TWO-PAGE SPREAD — laptop / desktop / wide tablet */
  const h = Math.max(340, bookH); /* full height minus top / bottom padding */

  let w = Math.max(
    240,
    Math.min(spreadPageW, Math.floor(availH * 0.95), SPREAD_MAX_PAGE_WIDTH),
  );

  /* Desktop: keep the same page shape as the 1460px book */
  if (vw >= DESKTOP_MIN_WIDTH) {
    w = Math.max(240, Math.min(w, Math.floor(h * DESKTOP_PAGE_ASPECT)));
  }

  return {
    width: w,
    height: h,
    portrait: false,
    desktop: vw >= DESKTOP_MIN_WIDTH,
  };
}

/* =========================================================
   COMPUTE TARGET PAGE
   Maps the current page index to the closest equivalent
   page in the new portrait/landscape layout.
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

    PAGE 1  → ABOUT LEFT
    PAGE 2  → ABOUT RIGHT
    PAGE 3  → PORTFOLIO LEFT
    PAGE 4  → PORTFOLIO RIGHT
    PAGE 5  → PORTFOLIO LEFT
    PAGE 6  → PORTFOLIO RIGHT
    PAGE 7  → TESTIMONIALS LEFT
    PAGE 8  → TESTIMONIALS RIGHT
    PAGE 9  → PRICING SECTION 1 → STARTER
    PAGE 10 → PRICING SECTION 2 → BASIC
    PAGE 11 → PRICING SECTION 3 → PREMIUM
    PAGE 12 → PRICING SECTION 4 → BUSINESS
    PAGE 13 → CONTACT LEFT
    PAGE 14 → CONTACT RIGHT
    PAGE 15 → BACK COVER
     ======================================================= */

  const [pages] = useState([
    /* PAGE 0 - FRONT COVER */
    {
      id: 0,
      type: "cover",
      title: "Selected Works",
      author: "MRA Developer",
    },

    /* PAGE 1 - ABOUT LEFT */
    {
      id: 1,
      type: "component",
      componentName: "About",
      isLeftPage: true,
    },

    /* PAGE 2 - ABOUT RIGHT */
    {
      id: 2,
      type: "component",
      componentName: "About",
      isLeftPage: false,
    },

    /* PAGE 3 - PORTFOLIO LEFT (spread 1) */
    {
      id: 3,
      type: "component",
      componentName: "Portfolio",
      spread: 1,
      isLeftPage: true,
    },

    /* PAGE 4 - PORTFOLIO RIGHT (spread 1) */
    {
      id: 4,
      type: "component",
      componentName: "Portfolio",
      spread: 1,
      isLeftPage: false,
    },

    /* PAGE 5 - PORTFOLIO LEFT (spread 2) */
    {
      id: 5,
      type: "component",
      componentName: "Portfolio",
      spread: 2,
      isLeftPage: true,
    },

    /* PAGE 6 - PORTFOLIO RIGHT (spread 2) */
    {
      id: 6,
      type: "component",
      componentName: "Portfolio",
      spread: 2,
      isLeftPage: false,
    },

    /* PAGE 7 - TESTIMONIALS LEFT */
    {
      id: 7,
      type: "component",
      componentName: "Testimonials",
      isLeftPage: true,
    },

    /* PAGE 8 - TESTIMONIALS RIGHT */
    {
      id: 8,
      type: "component",
      componentName: "Testimonials",
      isLeftPage: false,
    },

    /* PAGE 9 - PRICING SECTION 1 */
    {
      id: 9,
      type: "component",
      componentName: "Pricing",
      pricingSection: 1,
      isLeftPage: true,
    },

    /* PAGE 10 - PRICING SECTION 2 */
    {
      id: 10,
      type: "component",
      componentName: "Pricing",
      pricingSection: 2,
      isLeftPage: false,
    },

    /* PAGE 11 - PRICING SECTION 3 */
    {
      id: 11,
      type: "component",
      componentName: "Pricing",
      pricingSection: 3,
      isLeftPage: true,
    },

    /* PAGE 12 - PRICING SECTION 4 */
    {
      id: 12,
      type: "component",
      componentName: "Pricing",
      pricingSection: 4,
      isLeftPage: false,
    },

    /* PAGE 13 - CONTACT LEFT */
    {
      id: 13,
      type: "component",
      componentName: "Contact",
      isLeftPage: true,
    },

    /* PAGE 14 - CONTACT RIGHT */
    {
      id: 14,
      type: "component",
      componentName: "Contact",
      isLeftPage: false,
    },

    /* PAGE 15 - BACK COVER */
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

  /* START PAGE
     Passed to HTMLFlipBook so after a remount triggered by
     a breakpoint crossing the book reopens on the correct
     spread / page instead of always resetting to page 0. */

  const [startPage, setStartPage] = useState(0);

  const [isBookReady, setIsBookReady] = useState(false);

  const [isFlipbookMounted, setIsFlipbookMounted] = useState(false);

  const [isClosing, setIsClosing] = useState(false);

  const [isLanding, setIsLanding] = useState(false);

  /* REVEALED STATE
     True after landing overlay dismissed, until the book
     has been fully opened from the preview state. */

  const [isRevealed, setIsRevealed] = useState(false);

  /* PREVIEW STATE
     First click from the front cover advances into a preview
     page, and the second click opens the main content. */

  const [isPreviewStage, setIsPreviewStage] = useState(false);

  /* START A PROJECT MODAL STATE */

  const [isModalOpen, setIsModalOpen] = useState(false);

  /* BOOK REF */

  const bookRef = useRef(null);

  /* REFS — track portrait mode across renders and timers */

  const prevPortraitRef = useRef(dims.portrait);
  const remountTimerRef = useRef(null);
  const resizeTimerRef = useRef(null);

  /* ACTIVE PAGE REF
     Gives resize handler access to latest activePage
     without stale-closure issues. */

  const activePageRef = useRef(activePage);
  useEffect(() => {
    activePageRef.current = activePage;
  }, [activePage]);

  /* =======================================================
     RESIZE + ORIENTATION CHANGE
     ======================================================= */

  useEffect(() => {
    const recalculate = () => {
      const newDims = getBookDimensions();
      const crossedBreakpoint = newDims.portrait !== prevPortraitRef.current;

      setDims(newDims);

      if (crossedBreakpoint) {
        prevPortraitRef.current = newDims.portrait;

        const targetPage = computeTargetPage(
          activePageRef.current,
          newDims.portrait,
        );
        setStartPage(targetPage);
      }

      setIsFlipbookMounted(false);

      clearTimeout(remountTimerRef.current);
      remountTimerRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          setIsFlipbookMounted(true);
        });
      }, 60);
    };

    /* Debounced resize — 100 ms quiet period so rapid
       drag-resizes don't cause multiple remounts. */
    const debouncedResize = () => {
      clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(recalculate, 100);
    };

    window.addEventListener("resize", debouncedResize);
    window.addEventListener("orientationchange", recalculate);

    /* BOOK INITIALIZATION (first mount only) */

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        /* Re-measure now that navbar / footer exist in the DOM */
        setDims(getBookDimensions());

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
     ======================================================= */

  const SECTION_PAGES = {
    home: 0,
    about: 1,
    testimonials: 7,
    portfolio: 3,
    pricing: 9,
    contact: 13,
    behindCover: pages.length - 1,
  };

  /* =======================================================
     COMPONENT MAP
     ======================================================= */

  const COMPONENTS_MAP = {
    Home,
    About,
    Portfolio,
    Testimonials,
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

    const targetPage = SECTION_PAGES[section] ?? 1;

    // Reset the transient preview/reveal bookkeeping whenever
    // the user routes the book directly to a section. Otherwise
    // the front-cover open icon can remain trapped in a stale
    // preview state after switching from About to Home.
    setIsPreviewStage(false);
    setIsRevealed(false);

    if (isLanding) {
      setIsLanding(false);
      setTimeout(() => {
        if (bookRef.current && bookRef.current.pageFlip()) {
          bookRef.current.pageFlip().flip(targetPage);
        }
      }, 350);
      return;
    }

    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().flip(targetPage);
    }
  };

  /* =======================================================
     START A PROJECT CLICK HANDLER
     Opens the Start a Project modal from Home or Pricing.
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

    setIsModalOpen(true);
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

    if (newPage === 0) {
      setIsPreviewStage(false);
      setIsRevealed(false);
      setIsLanding(false);
      return;
    }

    setIsLanding(false);

    if (newPage === 1 && isPreviewStage) {
      setIsRevealed(true);
    } else {
      setIsRevealed(false);
    }
  };

  /* =======================================================
     OPEN BOOK BUTTON HANDLER
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

  const { width, height, portrait, desktop } = dims;

  /* =======================================================
     COVER TEXTURE (DESKTOP TWO-PAGE MODE)
     The cover image is cropped by object-fit, so on a narrower
     book (1242px - 1459px screens) the spine groove on the left
     was cropped away. In desktop two-page mode the texture box is
     given the same shape it has on the 1460px book, anchored to
     the spine side, so the spine looks the same at every width.
     The extra width is simply clipped by the cover. Sizes are
     exact pixels from the book size, so nothing depends on CSS
     container units. Book width / height are NOT changed.
     ======================================================= */

  const textureBoxW = Math.max(width, Math.round(height * DESKTOP_PAGE_ASPECT));

  const frontTextureStyle = desktop
    ? {
        left: 0,
        right: "auto",
        top: `${Math.round(height * -0.1)}px`,
        width: `${textureBoxW}px`,
        height: `${Math.round(height * 1.43)}px`,
      }
    : undefined;

  const backTextureStyle = desktop
    ? {
        left: "auto",
        right: 0,
        top: `${Math.round(height * -0.1)}px`,
        width: `${textureBoxW}px`,
        height: `${Math.round(height * 1.43)}px`,
        transform: "scaleX(-1)",
      }
    : { transform: "scaleX(-1)" };

  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const getIsActive = (section) => {
    if (section === "home") return activePage === 0;
    if (section === "about") return activePage === 1 || activePage === 2;
    if (section === "portfolio") return activePage >= 3 && activePage <= 6;
    if (section === "testimonials") return activePage === 7 || activePage === 8;
    if (section === "pricing") return activePage >= 9 && activePage <= 12;
    if (section === "contact") return activePage === 13;
    if (section === "behindCover") return activePage === pages.length - 1;

    const target = SECTION_PAGES[section];

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

  const ambientShadow = "0 0 20px rgba(0, 0, 0, 0.2)";

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
    /* LANDING POSITION */

    if (isLanding) {
      if (window.innerWidth < 1024) {
        return !portrait ? `translateX(-${width / 2}px)` : "translateX(0px)";
      }

      return "translateX(10vw)";
    }

    /* FRONT COVER */

    if (!portrait && activePage === 0) {
      return `translateX(-${width / 2}px)`;
    }

    /* BACK COVER */

    if (!portrait && activePage === pages.length - 1) {
      return `translateX(${width / 2}px)`;
    }

    /* NORMAL OPEN BOOK */

    return "translateX(0px)";
  };

  /* =======================================================
     MAIN
     ======================================================= */

  return (
    <div
      className={`book-wrapper ${isLanding ? "is-landing" : ""} ${
        portrait ? "is-portrait" : ""
      }`}
    >
      {/* ===================================================
          LANDING OVERLAY
         =================================================== */}

      <div className={`landing-overlay ${!isLanding ? "hidden" : ""}`}>
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

        {/* LANDING RIGHT */}

        <div className="landing-right-top desktop-only">
          <ExternalLink
            href="https://www.instagram.com/aafi.designs/"
            className="landing-contact"
          >
            CONTACT
          </ExternalLink>

          <div className="landing-divider"></div>

          <div className="landing-socials">
            {SOCIAL_LINKS.map(({ key, href, label, Icon }) => (
              <ExternalLink
                key={key}
                href={href}
                label={label}
                className="landing-social-icon"
              >
                <Icon />
              </ExternalLink>
            ))}
          </div>
        </div>
      </div>

      {/* LANDING BUTTONS - Mobile only
          Positioned after text content and before book */}

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

      <div className="book-layout-container">
        {/* ===================================================
            NAVBAR
           =================================================== */}

        <header className="site-header">
          <nav className="site-navbar">
            <a
              href="#home"
              className={`nav-link ${getIsActive("home") ? "active" : ""}`}
              onClick={(e) => handleNavClick(e, "home")}
            >
              Home
            </a>

            <a
              href="#about"
              className={`nav-link ${getIsActive("about") ? "active" : ""}`}
              onClick={(e) => handleNavClick(e, "about")}
            >
              About
            </a>

            <a
              href="#portfolio"
              className={`nav-link ${getIsActive("portfolio") ? "active" : ""}`}
              onClick={(e) => handleNavClick(e, "portfolio")}
            >
              Portfolio
            </a>

            <a
              href="#testimonials"
              className={`nav-link ${
                getIsActive("testimonials") ? "active" : ""
              }`}
              onClick={(e) => handleNavClick(e, "testimonials")}
            >
              Testimonials
            </a>

            <a
              href="#pricing"
              className={`nav-link ${getIsActive("pricing") ? "active" : ""}`}
              onClick={(e) => handleNavClick(e, "pricing")}
            >
              Pricing
            </a>

            <a
              href="#contact"
              className={`nav-link ${getIsActive("contact") ? "active" : ""}`}
              onClick={(e) => handleNavClick(e, "contact")}
            >
              Contact
            </a>

            <a
              href="#behind-the-cover"
              className={`nav-link ${
                getIsActive("behindCover") ? "active" : ""
              }`}
              onClick={(e) => handleNavClick(e, "behindCover")}
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

              visibility:
                isBookReady && isFlipbookMounted ? "visible" : "hidden",

              willChange: "transform, opacity",

              backfaceVisibility: "hidden",

              WebkitBackfaceVisibility: "hidden",

              cursor: isLanding ? "pointer" : "default",

              pointerEvents: isLanding
                ? "none"
                : isRevealed || isBackCover
                  ? "auto"
                  : "none",
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
              {/* BOOK SHADOW */}

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

              {/* LANDING CLICK AREA */}

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

              {/* CLICK-PREVENTION OVERLAY (REVEALED STATE)
                  Blocks all clicks on the book when isRevealed
                  is true and isFrontCover is true, ensuring
                  only the Open Book button can trigger navigation. */}

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

              {/* OPEN BOOK BUTTON (FRONT COVER) */}

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

              {/* CLOSE BOOK BUTTON (BACK COVER) */}

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

                      if (
                        activePage === 0 ||
                        (activePage === 1 && isPreviewStage)
                      ) {
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

              {/* HTML FLIP BOOK */}

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
                {/* BOOK PAGES */}

                {pages.map((page, index) => {
                  /* FRONT COVER */

                  if (page.type === "cover") {
                    return (
                      <div
                        key={page.id}
                        className="book-cover open-cover"
                        data-density="hard"
                        style={{
                          cursor: "pointer",
                          pointerEvents: isLanding
                            ? "auto"
                            : activePage === 0
                              ? "none"
                              : "auto",
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
                          style={frontTextureStyle}
                        />

                        <div className="bc-spine-shadow" />
                        <div className="bc-code-marker">i</div>

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

                  /* BACK COVER */

                  if (page.type === "backCover") {
                    return (
                      <div
                        key={page.id}
                        className="book-cover back-cover"
                        data-density="hard"
                        style={{
                          cursor:
                            isLanding || isFrontCover ? "default" : "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          /* Block back cover click during landing or revealed state */
                          if (isLanding || isRevealed || isFrontCover) {
                            return;
                          }
                          if (bookRef.current && bookRef.current.pageFlip()) {
                            bookRef.current.pageFlip().flip(1);
                          }
                        }}
                      >
                        <style>{backCoverResponsiveStyle}</style>
                        <img
                          src={coverImg}
                          alt="Cover texture"
                          className="book-cover-bg"
                          style={backTextureStyle}
                        />

                        {/* BACK COVER REDESIGN */}

                        <div className="bc-layout">
                          {/* TITLE */}
                          <div className="bc-title-area">
                            <h2 className="bc-title">Behind the Cover</h2>
                          </div>

                          {/* PHOTO WITH SINGLE GOLD RING */}
                          <div className="bc-photo-area">
                            <div className="bc-photo-ring">
                              <img
                                src={Profileimg}
                                alt="Sheikh Aftab"
                                className="bc-photo"
                              />
                            </div>
                          </div>

                          {/* BIO */}
                          <div className="bc-bio-area">
                            <p className="bc-para">
                              <strong className="bc-strong">
                                Sheikh Aftab
                              </strong>{" "}
                              is the founder and creative mind behind{" "}
                              <em className="bc-em">AAFI Designs</em>. With more
                              than 25 years of experience, he has progressed
                              from graphic designer to Art Director, working
                              with established advertising agencies across
                              publishing, branding, communication and print
                              production.
                            </p>
                            <p className="bc-para">
                              Having completed over 2,000 creative projects for
                              institutions, businesses and international
                              clients, Aftab now specializes in helping
                              independent authors and publishers transform
                              their ideas into distinctive book covers and
                              professionally crafted interiors. He brings
                              strategic thinking, strong typography and visual
                              storytelling to every
                              <span className="bc-no-wrap">
                                {" "}
                                creative project.
                              </span>
                            </p>
                            <p className="bc-para">
                              Originally from Pakistan and now based in Lisbon,
                              Portugal, Aftab works with clients worldwide.
                              Beyond the studio, he enjoys photography, travel
                              and discovering creative inspiration in everyday
                              life.
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

                  /* COMPONENT PAGES */

                  if (page.type === "component") {
                    const ComponentToRender =
                      COMPONENTS_MAP[page.componentName];

                    /*
                     * For mobile/portrait mode, we use the explicit isLeftPage
                     * from the page definition to determine which version to show.
                     * For desktop, we use the index parity to determine left/right.
                     */

                    const isLeft = portrait
                      ? page.isLeftPage // Use explicit value for mobile
                      : index % 2 !== 0; // Use index parity for desktop

                    /* PRICING */

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

                    /* NORMAL COMPONENTS */

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
            FOOTER
           =================================================== */}

        <footer className="site-footer">
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
              href="https://www.instagram.com/aafi.designs/"
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
      </div>

      {/* START A PROJECT MODAL */}

      <StartProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Book;