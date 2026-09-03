import React from "react";
import Layer1 from "../../assets/images/Layer1.png";
import Layer2 from "../../assets/images/Layer2.png";
import Layer3 from "../../assets/images/Layer3.png";
import Layer4 from "../../assets/images/Layer4.png";
import Layer5 from "../../assets/images/Layer5.png";
import Layer6 from "../../assets/images/Layer6.png";
import Layer7 from "../../assets/images/Layer7.png";
import Layer8 from "../../assets/images/Layer8.png";

/* =========================================================
   FONT
   ========================================================= */

const FONT =
  "'Helvetica Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif";


/* =========================================================
   TESTIMONIAL DATA
   ========================================================= */

const TESTIMONIALS_LEFT = [
  {
    id: 1,
    name: "Shanda Trofe",
    title: "CEO & Founder,\nTranscendent Publishing",
    quote:
      "Exceptional experience with him as always! Look no further for your cover design needs. You won't find a better designer with such a high level of customer service. Always exceeds every expectation.",
    image: Layer1,
  },
  {
    id: 2,
    name: "Brett Moran",
    title: "Author, Speaker,\nMindset Coach",
    quote:
      "If you're an author looking for amazing cover, I highly recommend Sheikh Aftab. His designs are incredible, and seeing your book on Amazon or bookshelves will make you proud. Fast delivery!",
    image: Layer2,
  },
  {
    id: 3,
    name: "David Hobby",
    title: "American Photographer",
    quote:
      "This is my second project with him, this time for a nude cover. He's a pleasure to work with — very professional and quick.",
    image: Layer3,
  },
  {
    id: 4,
    name: "Kristine Mirelle",
    title: "Musical Artist",
    quote:
      "I've worked with Aftab on multiple projects. His work looks amazing with stunning fit as one visuals. He delivers incredibly fast.",
    image: Layer4,
  },
];

const TESTIMONIALS_RIGHT = [
  {
    id: 5,
    name: "Alex Ford",
    title: "Business Coach,\nSpeaker",
    quote:
      "AAFI Designs transformed my vision into a professional, eye-catching book cover. Their creativity, communication, attention to detail, and reliable service made the entire process effortless.",
    image: Layer5,
  },
  {
    id: 6,
    name: "Shannon Hogan-Cohen",
    title: "Bestselling Author,\nFreelance Writer",
    quote:
      "Working with AAFI Designs was an excellent experience. They understood my ideas, offered creative direction, and delivered polished, publishing-ready files right on schedule, without complications.",
    image: Layer6,
  },
  {
    id: 7,
    name: "Alice Ford",
    title: "Adventure Filmmaker",
    quote:
      "AAFI Designs created a beautiful, professional cover that captured my vision perfectly. Communication was clear and timely.",
    image: Layer7,
  },
  {
    id: 8,
    name: "Ellyah Mashlach",
    title: "Certified Herbalist",
    quote:
      "Excellent service from beginning to end. AAFI Designs delivers creative, polished work and exceeded my expectations.",
    image: Layer8,
  },
];


/* =========================================================
   TESTIMONIAL STYLES
   ========================================================= */

const testimonialStyles = `

/* =========================================================
   MAIN TESTIMONIAL PAGE
   ========================================================= */

.aafi-testimonials-page {
  width: 100% !important;
  height: 100% !important;

  min-width: 0 !important;
  min-height: 0 !important;

  box-sizing: border-box !important;

  display: flex !important;
  flex-direction: column !important;

  overflow: hidden !important;

  padding: 10px 0 9px !important;

  font-family:
    'Helvetica Light',
    'Helvetica Neue Light',
    'Helvetica Neue',
    Helvetica,
    Arial,
    sans-serif !important;

  font-weight: 300 !important;

  color: #222 !important;
}


/* =========================================================
   HEADING
   ========================================================= */

.aafi-testimonials-heading {
  flex: 0 0 auto !important;

  position: relative !important;
  top: 0 !important;

  margin: 0 0 10px 0 !important;
  padding: 0 10px !important;

  font-family:
    'Helvetica Light',
    'Helvetica Neue Light',
    'Helvetica Neue',
    Helvetica,
    Arial,
    sans-serif !important;

  font-size: 17px !important;
  font-weight: 300 !important;
  text-transform: capitalize !important;

  line-height: 1.1 !important;

  color: #191919 !important;
}


/* =========================================================
   RIGHT PAGE HEADING SPACE
   ========================================================= */

.aafi-testimonials-heading-spacer {
  height: 18px !important;
  min-height: 18px !important;

  flex: 0 0 18px !important;

  margin-bottom: 10px !important;
}


/* =========================================================
   TESTIMONIAL GRID
   ========================================================= */

.aafi-testimonials-grid {
  position: relative !important;

  width: 100% !important;
  height: 100% !important;

  flex: 1 1 auto !important;

  min-width: 0 !important;
  min-height: 0 !important;

  box-sizing: border-box !important;

  display: grid !important;

  grid-template-columns:
    minmax(0, 1fr)
    minmax(0, 1fr) !important;

  grid-template-rows:
    minmax(0, 1fr)
    minmax(0, 1fr) !important;

  column-gap: 0 !important;
  row-gap: 0 !important;

  padding: 0 13px !important;

  overflow: hidden !important;
}


/* =========================================================
   CENTER DIVIDER
   ========================================================= */

.aafi-testimonials-grid::before {
  content: "" !important;

  position: absolute !important;

  top: 0 !important;
  bottom: 0 !important;

  left: 50% !important;

  width: 1px !important;

  background: rgba(70, 70, 70, 0.35) !important;

  transform: translateX(-50%) !important;

  z-index: 20 !important;

  pointer-events: none !important;
}


/* =========================================================
   TESTIMONIAL CARD

   IMPORTANT:
   Do NOT use space-between here.
   Content is placed naturally with controlled gaps.
   ========================================================= */

.aafi-testimonial-card {
  width: 100% !important;
  height: 100% !important;

  min-width: 0 !important;
  min-height: 0 !important;

  box-sizing: border-box !important;

  display: flex !important;
  flex-direction: column !important;

  justify-content: flex-start !important;
  align-items: flex-start !important;

  align-self: stretch !important;

  overflow: hidden !important;

  font-family:
    'Helvetica Light',
    'Helvetica Neue Light',
    'Helvetica Neue',
    Helvetica,
    Arial,
    sans-serif !important;
}


/* =========================================================
   LEFT / RIGHT COLUMN SPACING
   ========================================================= */

.aafi-testimonial-card:nth-child(odd) {
  padding-left: 0 !important;
  padding-right: 8px !important;
}

.aafi-testimonial-card:nth-child(even) {
  padding-left: 8px !important;
  padding-right: 0 !important;
}


/* =========================================================
   TOP ROW CARDS
   ========================================================= */

.aafi-testimonial-card:nth-child(1),
.aafi-testimonial-card:nth-child(2) {
  padding-top: 0 !important;
  padding-bottom: 10px !important;
}


/* =========================================================
   BOTTOM ROW CARDS
   ========================================================= */

.aafi-testimonial-card:nth-child(3),
.aafi-testimonial-card:nth-child(4) {
  padding-top: 10px !important;
  padding-bottom: 0 !important;
}


/* =========================================================
   AVATAR ROW
   ========================================================= */

.aafi-testimonial-avatar-row {
  width: 100% !important;

  height: 40px !important;
  min-height: 40px !important;

  flex: 0 0 40px !important;

  display: flex !important;

  align-items: center !important;

  justify-content: flex-start !important;

  gap: 4px !important;

  margin: 0 0 2px 0 !important;
  padding: 0 !important;

  box-sizing: border-box !important;
}


/* =========================================================
   AVATAR
   ========================================================= */

.aafi-testimonial-avatar {
  width: 40px !important;
  height: 40px !important;

  min-width: 40px !important;
  min-height: 40px !important;

  flex: 0 0 40px !important;

  border-radius: 50% !important;

  box-sizing: border-box !important;

  display: flex !important;

  align-items: center !important;
  justify-content: center !important;

  overflow: hidden !important;

  border: 1px solid rgba(0, 0, 0, 0.14) !important;

  background: #f0f0f0 !important;
}

.aafi-testimonial-avatar img {
  width: 100% !important;
  height: 100% !important;

  object-fit: cover !important;
  object-position: center 20% !important;

  display: block !important;
}


/* =========================================================
   QUOTE SYMBOL
   ========================================================= */

.aafi-testimonial-quote {
  display: inline-flex !important;

  align-items: center !important;
  justify-content: center !important;

  font-family:
    Georgia,
    'Times New Roman',
    serif !important;

  font-size: 30px !important;

  font-weight: 500 !important;

  line-height: 1 !important;

  color: #845E12 !important;

  transform: translateY(-1px) !important;

  margin-left: 0 !important;
}


/* =========================================================
   TESTIMONIAL BODY

   Increased size so the available space is actually used.
   ========================================================= */

.aafi-testimonial-body {
  width: 100% !important;

  height: auto !important;

  min-height: 0 !important;

  max-height: none !important;

  margin: 0 0 13px 0 !important;
  padding: 0 !important;

  box-sizing: border-box !important;

  font-family:
    'Helvetica Light',
    'Helvetica Neue Light',
    'Helvetica Neue',
    Helvetica,
    Arial,
    sans-serif !important;

  font-size: 7.8px !important;

  font-weight: 300 !important;

  line-height: 1.42 !important;

  letter-spacing: 0 !important;

  color: #353535 !important;

  white-space: normal !important;

  word-break: normal !important;

  overflow-wrap: break-word !important;

  text-align: left !important;

  overflow: visible !important;

  display: block !important;

  flex: 0 0 auto !important;

  -webkit-line-clamp: unset !important;

  -webkit-box-orient: unset !important;
}


/* =========================================================
   NAME
   ========================================================= */

.aafi-testimonial-name {
  width: 100% !important;

  height: auto !important;

  margin: 0 0 8px 0 !important;
  padding: 0 !important;

  font-family:
    'Helvetica Light',
    'Helvetica Neue Light',
    'Helvetica Neue',
    Helvetica,
    Arial,
    sans-serif !important;

  font-size: 8px !important;

  font-weight: 700 !important;

  line-height: 1.2 !important;

  color: #171717 !important;

  overflow: visible !important;

  flex: 0 0 auto !important;
}


/* =========================================================
   TITLE
   ========================================================= */

.aafi-testimonial-title {
  width: 100% !important;

  height: auto !important;

  margin: 0 !important;
  padding: 0 !important;

  font-family:
    'Helvetica Light',
    'Helvetica Neue Light',
    'Helvetica Neue',
    Helvetica,
    Arial,
    sans-serif !important;

  font-size: 6.3px !important;

  font-weight: 300 !important;

  line-height: 1.15 !important;

  color: #686868 !important;

  white-space: pre-line !important;

  overflow: visible !important;

  flex: 0 0 auto !important;
}


/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 900px) {

  .aafi-testimonials-page {
    padding: 8px 0 7px !important;
  }

  .aafi-testimonials-heading {
    font-size: 16px !important;
    margin-bottom: 8px !important;
    padding: 0 10px !important;
  }

  .aafi-testimonials-heading-spacer {
    height: 17px !important;
    min-height: 17px !important;
    flex-basis: 17px !important;
    margin-bottom: 8px !important;
  }

  .aafi-testimonials-grid {
    padding: 0 8px !important;
  }

  .aafi-testimonial-card:nth-child(odd) {
    padding-right: 7px !important;
  }

  .aafi-testimonial-card:nth-child(even) {
    padding-left: 7px !important;
  }

  .aafi-testimonial-card:nth-child(1),
  .aafi-testimonial-card:nth-child(2) {
    padding-bottom: 8px !important;
  }

  .aafi-testimonial-card:nth-child(3),
  .aafi-testimonial-card:nth-child(4) {
    padding-top: 8px !important;
  }

  .aafi-testimonial-avatar-row {
    height: 36px !important;
    min-height: 36px !important;
    flex-basis: 36px !important;
    margin-bottom: 7px !important;
    gap: 3px !important;
  }

  .aafi-testimonial-avatar {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    min-height: 36px !important;
    flex-basis: 36px !important;
  }

  .aafi-testimonial-avatar img {
    object-position: center 20% !important;
  }

  .aafi-testimonial-quote {
    font-size: 18px !important;
  }

  .aafi-testimonial-body {
    font-size: 7px !important;
    line-height: 1.38 !important;
    margin-bottom: 11px !important;
  }

  .aafi-testimonial-name {
    font-size: 7.2px !important;
    margin-bottom: 2px !important;
  }

  .aafi-testimonial-title {
    font-size: 5.7px !important;
    line-height: 1.1 !important;
  }
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 640px) {

  .aafi-testimonials-page {
    padding: 7px 0 6px !important;
  }

  .aafi-testimonials-heading {
    font-size: 15px !important;
    margin-bottom: 7px !important;
    padding: 0 8px !important;
  }

  .aafi-testimonials-heading-spacer {
    height: 16px !important;
    min-height: 16px !important;
    flex-basis: 16px !important;
    margin-bottom: 7px !important;
  }

  .aafi-testimonials-grid {
    padding: 0 6px !important;
  }

  .aafi-testimonial-card:nth-child(odd) {
    padding-right: 5px !important;
  }

  .aafi-testimonial-card:nth-child(even) {
    padding-left: 5px !important;
  }

  .aafi-testimonial-avatar-row {
    height: 32px !important;
    min-height: 32px !important;
    flex-basis: 32px !important;
    margin-bottom: 6px !important;
    gap: 3px !important;
  }

  .aafi-testimonial-avatar {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px !important;
    min-height: 32px !important;
    flex-basis: 32px !important;
  }

  .aafi-testimonial-avatar img {
    object-position: center 20% !important;
  }

  .aafi-testimonial-quote {
    font-size: 16px !important;
  }

  .aafi-testimonial-body {
    font-size: 6.1px !important;
    line-height: 1.34 !important;
    margin-bottom: 9px !important;
  }

  .aafi-testimonial-name {
    font-size: 6.4px !important;
    margin-bottom: 2px !important;
  }

  .aafi-testimonial-title {
    font-size: 5.1px !important;
    line-height: 1.1 !important;
  }
}


/* =========================================================
   SMALL MOBILE
   ========================================================= */

@media (max-width: 480px) {

  .aafi-testimonials-page {
    padding: 6px 0 5px !important;
  }

  .aafi-testimonials-heading {
    font-size: 14px !important;
    margin-bottom: 6px !important;
    padding: 0 6px !important;
  }

  .aafi-testimonials-heading-spacer {
    height: 15px !important;
    min-height: 15px !important;
    flex-basis: 15px !important;
    margin-bottom: 6px !important;
  }

  .aafi-testimonials-grid {
    padding: 0 5px !important;
  }

  .aafi-testimonial-card:nth-child(odd) {
    padding-right: 5px !important;
  }

  .aafi-testimonial-card:nth-child(even) {
    padding-left: 5px !important;
  }

  .aafi-testimonial-avatar-row {
    height: 28px !important;
    min-height: 28px !important;
    flex-basis: 28px !important;
    margin-bottom: 5px !important;
    gap: 2px !important;
  }

  .aafi-testimonial-avatar {
    width: 28px !important;
    height: 28px !important;
    min-width: 28px !important;
    min-height: 28px !important;
    flex-basis: 28px !important;
  }

  .aafi-testimonial-avatar img {
    object-position: center 20% !important;
  }

  .aafi-testimonial-quote {
    font-size: 14px !important;
  }

  .aafi-testimonial-body {
    font-size: 5.6px !important;
    line-height: 1.30 !important;
    margin-bottom: 8px !important;
  }

  .aafi-testimonial-name {
    font-size: 6px !important;
    margin-bottom: 2px !important;
  }

  .aafi-testimonial-title {
    font-size: 4.8px !important;
    line-height: 1.1 !important;
  }
}

`;


/* =========================================================
   CARD
   ========================================================= */

function TestimonialCard({ data }) {
  return (
    <article className="aafi-testimonial-card" style={{ fontFamily: FONT }}>

      {/* Avatar + quote */}
      <div className="aafi-testimonial-avatar-row" style={{ fontFamily: FONT }}>

        <div
          className="aafi-testimonial-avatar"
          aria-hidden="true"
          style={{ fontFamily: FONT }}
        >
          <img src={data.image} alt={data.name} />
        </div>

        <span className="aafi-testimonial-quote" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          “
        </span>

      </div>


      {/* Full testimonial */}
      <p className="aafi-testimonial-body" style={{ fontFamily: FONT }}>
        {data.quote}
      </p>


      {/* Name */}
      <p className="aafi-testimonial-name" style={{ fontFamily: FONT }}>
        {data.name}
      </p>


      {/* Position */}
      <p className="aafi-testimonial-title" style={{ fontFamily: FONT }}>
        {data.title}
      </p>

    </article>
  );
}


/* =========================================================
   LEFT PAGE
   ========================================================= */

function TestimonialsLeft() {
  return (
    <div className="aafi-testimonials-page" style={{ fontFamily: FONT }}>

      <h2 className="aafi-testimonials-heading" style={{ fontFamily: FONT }}>
        Testimonials
      </h2>

      <div className="aafi-testimonials-grid" style={{ fontFamily: FONT }}>

        {TESTIMONIALS_LEFT.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            data={testimonial}
          />
        ))}

      </div>

    </div>
  );
}


/* =========================================================
   RIGHT PAGE
   ========================================================= */

function TestimonialsRight() {
  return (
    <div className="aafi-testimonials-page" style={{ fontFamily: FONT }}>

      <div
        className="aafi-testimonials-heading-spacer"
        aria-hidden="true"
        style={{ fontFamily: FONT }}
      />

      <div className="aafi-testimonials-grid" style={{ fontFamily: FONT }}>

        {TESTIMONIALS_RIGHT.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            data={testimonial}
          />
        ))}

      </div>

    </div>
  );
}


/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function Testimonials({ isLeft }) {
  return (
    <>
      <style>{testimonialStyles}</style>

      {isLeft ? (
        <TestimonialsLeft />
      ) : (
        <TestimonialsRight />
      )}
    </>
  );
}