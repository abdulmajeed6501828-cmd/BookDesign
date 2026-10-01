import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./Pricing.css";

/* Reference page width (px) the CSS is authored at */
const DESIGN_W = 322;

/* ---------- Top & bottom space (design px) ----------
   Adapts to the page shape:
   - normal book-shaped pages (tablet / desktop) -> PAD_MIN
   - tall narrow pages (phones)                  -> PAD_MAX */
const PAD_MIN = 22;
const PAD_MAX = 52;
const PAD_FROM_H = 440;
const PAD_TO_H = 720;

/* ---------- Heading / price / button scale ----------
   On tall narrow pages the fixed-size parts (title, plan name, subtitle,
   price, button) scale up so they stay proportional to the bigger text. */
const BOOST_MAX = 1.25;
const BOOST_FROM_H = 540;
const BOOST_TO_H = 900;

/* Height (design px) of the content without any top/bottom padding */
const CONTENT_MIN_H = 374;
/* Smallest design height that still fits the longest plan (Business) */
const MIN_DESIGN_H = CONTENT_MIN_H + PAD_MIN * 2;
/* Height (design px) of everything except the details list and padding,
   at scale 1 (header + heading + margins + price + button) */
const FIXED_CONTENT_H = 197.5;
/* Safety buffer (design px) */
const FIXED_BUFFER = 20;

/* Share of the page width available to the details text */
const TEXT_W_RATIO = 0.69;
/* Average glyph width as a fraction of font-size (Helvetica) */
const CHAR_W = 0.54;
/* Font-size limits (design px) when text is allowed to wrap */
const WRAP_MAX_FONT = 20;
const WRAP_MIN_FONT = 9;

/* ---------- Header that matches the Portfolio / Testimonials pages ----------
   On desktop the "Pricing" title, the gold line and the page number use the
   exact same size, thickness and height as the Portfolio and Testimonials
   headers. Those pages are authored at 370 x 480 and scale by
   min(pageW / 370, pageH / 480), so we use the same scale here. */
const MATCH_DESIGN_W = 370;
const MATCH_DESIGN_H = 480;
const MATCH_TOP = 30; // gap above the header (design px of those pages)
const MATCH_HEADER_H = 22; // header height (design px of those pages)
const DESKTOP_QUERY = "(min-width: 801px)";

const ease = (v, from, to) => Math.min(1, Math.max(0, (v - from) / (to - from)));

/* Padding, heading scale and "tall page" progress for a design height */
const getMetrics = (designH) => {
  const pt = ease(designH, PAD_FROM_H, PAD_TO_H);
  const bt = ease(designH, BOOST_FROM_H, BOOST_TO_H);
  return {
    padY: Math.round((PAD_MIN + pt * (PAD_MAX - PAD_MIN)) * 10) / 10,
    boost: Math.round((1 + bt * (BOOST_MAX - 1)) * 1000) / 1000,
    bt,
  };
};

/* =========================================================
   PRICING DATA
   ========================================================= */

const pricingPlans = {
  starter: {
    name: "Starter",
    subtitle: "Digital eBook Cover\n(Kindle Only)",
    details: [
      "3 cover studies\nstock image / AI",
      "2 rounds of revisions",
      "3D single & stack\nbook presentation",
      "Preparation of press\nready files (JPG/PNG)",
      "Source file (PSD/AI)",
      "2-3 days delivery",
    ],
    price: "$150",
  },

  basic: {
    name: "Basic",
    subtitle: "Physical Print Cover\n(Paperback Only)",
    details: [
      "2 cover studies\nstock image",
      "3 rounds of revisions",
      "3D single & stack\nbook presentation",
      "Preparation of press\nready files (PDF)",
      "Source file (PSD/AI)",
      "3-4 days delivery",
    ],
    price: "$200",
  },

  premium: {
    name: "Premium",
    subtitle: "eBook + Print Cover Design\n(Paperback)",
    details: [
      "2 cover studies\nstock image",
      "4 rounds of revisions",
      "3D single & stack\nbook presentation",
      "Preparation of press\nready files (JPG/PNG/PDF)",
      "Source file (PSD/AI)",
      "4-5 days delivery",
    ],
    price: "$300",
  },

  business: {
    name: "Business",
    subtitle: "eBook & Print Cover Design\n+ Book Layout",
    details: [
      "3 cover studies\nstock image",
      "5 rounds of revisions",
      "3D single & stack\nbook presentation",
      "Text book layout design\n(200 pages) with\n5 rounds of revisions",
      "Preparation of press\nready files (JPG/PNG/PDF)",
      "Source file (PSD/AI)",
      "4-5 days delivery",
    ],
    price: "$500",
  },
};

const countLines = (details) =>
  details.reduce((sum, d) => sum + d.split("\n").length, 0);

/* Longest single line of text in a plan's details (characters) */
const longestLine = (details) =>
  Math.max(...details.flatMap((d) => d.split("\n").map((l) => l.length)));

/* Greedy word-wrap estimate: how many lines does `text` take at `maxChars`? */
const wrapLineCount = (text, maxChars) => {
  const words = text.replace(/\n/g, " ").split(" ").filter(Boolean);
  let lines = 1;
  let cur = 0;
  words.forEach((w) => {
    if (cur === 0) cur = w.length;
    else if (cur + 1 + w.length <= maxChars) cur += 1 + w.length;
    else {
      lines += 1;
      cur = w.length;
    }
  });
  return lines;
};

/*
  Layout A: explicit line breaks, exactly as designed.
*/
const getFixedLayout = (details, designW, avail) => {
  const lines = countLines(details);
  const gaps = details.length - 1;

  let ratio = 0.55; // gap / line-height
  let k = 1.4; // line-height / font-size
  let lh = avail / (lines + ratio * gaps);
  let font = lh / k;

  if (font < 10.5) {
    ratio = 0.23;
    k = 1.25;
    lh = avail / (lines + ratio * gaps);
    font = lh / k;
  }

  // keep the longest line within ~76% of the page width
  const cap = (designW * 0.76) / (CHAR_W * longestLine(details));
  if (font > cap) font = cap;

  font = Math.max(9, font);
  lh = font * k;

  return { font, lh };
};

/*
  Layout B: text may wrap. Find the largest font whose wrapped lines
  + minimum gaps still fit the available height, so the list fills the
  page with small, even gaps. On tall pages the line height grows a bit
  (1.4 -> ~1.52) and the maximum font grows with the heading scale.
*/
const getWrapLayout = (details, designW, avail, boost, bt) => {
  const textW = designW * TEXT_W_RATIO;
  const k = 1.4 + 0.12 * bt; // line-height / font-size
  const gapRatio = 0.5; // minimum gap / line-height
  const gaps = details.length - 1;
  const maxFont = Math.floor(WRAP_MAX_FONT * boost * 4) / 4;

  for (let f = maxFont; f >= WRAP_MIN_FONT; f -= 0.25) {
    const maxChars = Math.floor(textW / (CHAR_W * f));
    const lh = f * k;
    const lines = details.reduce(
      (sum, d) => sum + wrapLineCount(d, maxChars),
      0
    );
    if (lines * lh + gaps * gapRatio * lh <= avail) {
      return { font: f, lh };
    }
  }
  return { font: WRAP_MIN_FONT, lh: WRAP_MIN_FONT * k };
};

const getDetailsLayout = (details, designW, designH, headerExtra = 0) => {
  const { padY, boost, bt } = getMetrics(designH);
  const avail =
    designH -
    (padY * 2 + FIXED_CONTENT_H * boost + FIXED_BUFFER + headerExtra);

  const fixed = getFixedLayout(details, designW, avail);
  const wrap = getWrapLayout(details, designW, avail, boost, bt);

  // Use wrapping when it gives clearly bigger text; on tall pages
  // prefer it as soon as it is about as big (it fills the height better)
  const useWrap = wrap.font > fixed.font * (1.05 - 0.1 * bt);
  const chosen = useWrap ? wrap : fixed;

  return {
    font: Math.round(chosen.font * 100) / 100,
    lh: Math.round(chosen.lh * 100) / 100,
    wrap: useWrap,
  };
};

/* =========================================================
   SINGLE PRICING CARD
   ========================================================= */

const PricingCard = ({
  plan,
  onStartProject,
  designWidth = DESIGN_W,
  designHeight = MIN_DESIGN_H,
  headerExtra = 0,
}) => {
  if (!plan) return null;

  const { font, lh, wrap } = getDetailsLayout(
    plan.details,
    designWidth,
    designHeight,
    headerExtra
  );

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();
    if (onStartProject) onStartProject(e);
  };

  return (
    <div className="pricing-plan-card">
      <div className="pricing-plan-heading">
        <h3 className="pricing-plan-name">{plan.name}</h3>
        <p className="pricing-plan-subtitle">{plan.subtitle}</p>
      </div>

      <div
        className="pricing-details-container"
        style={{
          "--d-font": `${font}px`,
          "--d-lh": `${lh}px`,
          "--d-ws": wrap ? "normal" : "pre",
        }}
      >
        {plan.details.map((detail, index) => (
          <p key={`${plan.name}-${index}`} className="pricing-detail-text">
            {wrap ? detail.replace(/\n/g, " ") : detail}
          </p>
        ))}
      </div>

      <div className="pricing-price-container">
        <p className="pricing-price-text">{plan.price}</p>
      </div>

      <div className="pricing-button-container">
        <button
          type="button"
          onClick={handleClick}
          className="pricing-start-button"
        >
          START A PROJECT
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   PAGE CONTENT
   Measures the page (layout size, unaffected by flip transforms),
   picks one scale, and sizes the artboard to exactly fill the page.
   ========================================================= */

const PricingContent = ({
  plan,
  isLeft = true,
  pageNumber = null,
  onStartProject = null,
}) => {
  const wrapRef = useRef(null);
  const [dims, setDims] = useState(null); // { s, w, h } in design px

  /* desktop (801px and above) = header matches Portfolio / Testimonials */
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia(DESKTOP_QUERY).matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    const update = () => {
      const pageW = el.clientWidth;
      const pageH = el.clientHeight;
      if (pageW > 0 && pageH > 0) {
        const s = Math.min(pageW / DESIGN_W, pageH / MIN_DESIGN_H);
        setDims({ s, w: pageW / s, h: pageH / s });
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { padY, boost } = getMetrics(dims ? dims.h : MIN_DESIGN_H);

  /* ---- header-match values (desktop only) ----
     hm = (Portfolio / Testimonials scale) / (Pricing scale), so that
     "21px * hm" inside the Pricing artboard is exactly the same on-screen
     size as 21px * scale on those pages. */
  const matchHeader = isDesktop && dims !== null;
  let hm = 1;
  let headerExtra = 0;
  if (matchHeader) {
    const pageW = dims.w * dims.s;
    const pageH = dims.h * dims.s;
    const S = Math.min(pageW / MATCH_DESIGN_W, pageH / MATCH_DESIGN_H);
    hm = S / dims.s;
    // extra height the new header takes compared with the old one
    headerExtra = (MATCH_TOP + MATCH_HEADER_H) * hm - (padY + 22 * boost);
  }

  return (
    <div
      ref={wrapRef}
      className={`pricing-page-container ${
        isLeft ? "pricing-page-left" : "pricing-page-right"
      }`}
    >
      <div
        className={`pricing-artboard${matchHeader ? " pricing-match" : ""}`}
        style={
          dims
            ? {
                "--s": dims.s,
                "--pad-y": `${padY}px`,
                "--b": boost,
                "--hm": hm,
                width: dims.w,
                height: dims.h,
              }
            : {
                "--pad-y": `${padY}px`,
                "--b": boost,
                visibility: "hidden",
                width: DESIGN_W,
                height: MIN_DESIGN_H,
              }
        }
      >
        {isLeft ? (
          <div className="pricing-header-left">
            <h2 className="pricing-title">Pricing</h2>
            <div className="pricing-gold-line" />
          </div>
        ) : (
          <div className="pricing-header-right">
            <div className="pricing-gold-line" />
            {pageNumber && (
              <span className="pricing-page-number">{pageNumber}</span>
            )}
          </div>
        )}

        <PricingCard
          plan={plan}
          onStartProject={onStartProject}
          designWidth={dims ? dims.w : DESIGN_W}
          designHeight={dims ? dims.h : MIN_DESIGN_H}
          headerExtra={headerExtra}
        />
      </div>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT (same props as before)
   ========================================================= */

export default function Pricing({
  plan = null,
  isLeft = true,
  section = null,
  pricingSection = null,
  onStartProject = null,
}) {
  const activeSection = section || pricingSection;

  const sections = {
    1: { plan: pricingPlans.starter, isLeft: true, pageNumber: null },
    2: { plan: pricingPlans.basic, isLeft: false, pageNumber: "01" },
    3: { plan: pricingPlans.premium, isLeft: true, pageNumber: null },
    4: { plan: pricingPlans.business, isLeft: false, pageNumber: "02" },
  };

  if (sections[activeSection]) {
    return (
      <PricingContent
        {...sections[activeSection]}
        onStartProject={onStartProject}
      />
    );
  }

  if (plan && pricingPlans[plan]) {
    const isPlanLeft = plan === "starter" || plan === "premium";
    const pageNum = plan === "basic" ? "01" : plan === "business" ? "02" : null;
    return (
      <PricingContent
        plan={pricingPlans[plan]}
        isLeft={isPlanLeft}
        pageNumber={pageNum}
        onStartProject={onStartProject}
      />
    );
  }

  return (
    <PricingContent
      plan={isLeft ? pricingPlans.starter : pricingPlans.basic}
      isLeft={isLeft}
      pageNumber={!isLeft ? "01" : null}
      onStartProject={onStartProject}
    />
  );
}

export { pricingPlans, PricingCard, PricingContent };