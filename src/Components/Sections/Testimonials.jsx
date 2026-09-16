import React from "react";
import layer1 from "../../assets/images/Layer1.png";
import layer2 from "../../assets/images/Layer2.png";
import layer3 from "../../assets/images/Layer3.png";
import layer4 from "../../assets/images/Layer4.png";
import layer5 from "../../assets/images/Layer5.png";
import layer6 from "../../assets/images/Layer6.png";
import layer7 from "../../assets/images/Layer7.png";
import layer8 from "../../assets/images/Layer8.png";
import "./Testimonials.css";

/* =========================================================
   TESTIMONIALS RESPONSIVE STYLE
   ========================================================= */

const testimonialResponsiveStyle = `
  .testimonials-page-container {
    overflow: visible !important;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
  }

  .testimonials-header-left,
  .testimonials-header-right {
    flex-shrink: 0;
    min-width: 0;
  }

  .testimonials-grid {
    gap: clamp(3px, 0.8vh, 8px) !important;
    min-width: 0;
    min-height: 0;
  }

  .testimonials-grid-row {
    min-width: 0;
    min-height: 0;
    gap: clamp(4px, 0.8vw, 8px);
  }

  .testimonial-card {
    min-width: 0;
    min-height: 0;
    padding-left: clamp(6px, 0.8vw, 10px) !important;
    padding-right: clamp(6px, 0.8vw, 10px) !important;
    overflow: visible !important;
  }

  .testimonial-card.with-right-border {
    border-right: 1px solid rgba(200, 185, 155, 0.45);
  }

  @media (max-width: 767px) {
    .testimonials-page-container {
      padding-top: 8px !important;
      padding-bottom: 8px !important;
      padding-left: 10px !important;
      padding-right: 10px !important;
      overflow: visible !important;
    }

    .testimonials-grid {
      gap: 4px !important;
      overflow: visible !important;
      width: 100%;
    }

    .testimonials-grid-row {
      gap: 6px !important;
      overflow: visible !important;
      min-height: 0;
    }

    .testimonial-card {
      padding-left: 5px !important;
      padding-right: 5px !important;
      padding-top: 2px !important;
      padding-bottom: 2px !important;
      border-right: none !important;
      overflow: visible !important;
    }

    .testimonial-card.with-right-border {
      border-right: none !important;
    }

    .testimonial-avatar-wrapper {
      width: 28px !important;
      height: 28px !important;
      flex-shrink: 0;
    }

    .testimonial-gold-quote {
      font-size: 14px !important;
    }

    .testimonial-quote-text {
      font-size: 8px !important;
      line-height: 1.2 !important;
    }

    .testimonial-author-name {
      font-size: 8.4px !important;
      white-space: normal !important;
    }

    .testimonial-author-role {
      font-size: 7.4px !important;
      line-height: 1.2 !important;
    }
  }

  @media (max-width: 480px) {
    .testimonials-page-container {
      padding-top: 7px !important;
      padding-bottom: 7px !important;
      padding-left: 7px !important;
      padding-right: 7px !important;
      overflow: visible !important;
    }

    .testimonials-grid {
      gap: 3px !important;
    }

    .testimonials-grid-row {
      gap: 4px !important;
    }

    .testimonial-card {
      padding-left: 4px !important;
      padding-right: 4px !important;
    }

    .testimonial-avatar-wrapper {
      width: 25px !important;
      height: 25px !important;
    }

    .testimonial-quote-text {
      font-size: 7.5px !important;
      line-height: 1.18 !important;
    }

    .testimonial-author-name {
      font-size: 7.7px !important;
    }

    .testimonial-author-role {
      font-size: 6.9px !important;
    }
  }
`;

/* =========================================================
   TESTIMONIALS DATA (MATCHING REFERENCE IMAGE 100%)
   ========================================================= */

const testimonialsLeft = [
    {
        id: 1,
        image: layer1,
        quote:
            "Exceptional experience with him, as always! Look no further for your cover design needs. You won't find a better designer with such a high level of customer service. Always exceeds every expectation.",
        name: "Shanda Trofe",
        role: "CEO & Founder,\nTranscendent Publishing",
    },
    {
        id: 2,
        image: layer2,
        quote:
            "If you're an author seeking a standout cover, I highly recommend Sheikh Aftab. His designs are incredible, and seeing your book on Amazon or bookshelves will make you proud. Fast delivery!",
        name: "Brett Moran",
        role: "Author, Speaker,\nMindset Coach",
    },
    {
        id: 3,
        image: layer3,
        quote:
            "This is my second project with him, this time for a book cover. He's a pleasure to work with—very professional and quick.",
        name: "David Hobby",
        role: "American Photographer",
    },
    {
        id: 4,
        image: layer4,
        quote:
            "I've worked with Aftab on multiple projects. His work looks amazing, with stunning titles and visuals. He delivers incredibly fast.",
        name: "Kristine Mirelle",
        role: "Musical Artist",
    },
];

const testimonialsRight = [
    {
        id: 5,
        image: layer5,
        quote:
            "AAFI Designs transformed my vision into a professional, eye-catching book cover. Their creativity, communication, attention to detail, and reliable service made the entire process effortless.",
        name: "Alex Ford",
        role: "Business Coach,\nSpeaker",
    },
    {
        id: 6,
        image: layer6,
        quote:
            "Working with AAFI Designs was an excellent experience. They understood my ideas, offered creative direction, and delivered polished, publishing-ready files right on schedule without complications.",
        name: "Shannon Hogan-Cohen",
        role: "Bestselling Author,\nFreelance Writer",
    },
    {
        id: 7,
        image: layer7,
        quote:
            "AAFI Designs created a beautiful, professional cover that captured my vision perfectly. Communication was clear and timely.",
        name: "Alice Ford",
        role: "Adventure Filmmaker",
    },
    {
        id: 8,
        image: layer8,
        quote:
            "Excellent service from beginning to end. AAFI Designs delivered creative, polished work and exceeded my expectations.",
        name: "Eliyah Mashiach",
        role: "Certified Herbalist",
    },
];

/* =========================================================
   SINGLE TESTIMONIAL CARD COMPONENT
   ========================================================= */

const TestimonialCard = ({ item, showRightBorder }) => {
    return (
        <div
            className={`testimonial-card ${showRightBorder ? "with-right-border" : ""}`}
        >
            {/* AVATAR + GOLD QUOTE ICON */}
            <div className="testimonial-card-header">
                <div className="testimonial-avatar-wrapper">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="testimonial-avatar-img"
                    />
                </div>
                <div className="testimonial-gold-quote" aria-hidden="true">
                    &#8220;
                </div>
            </div>

            {/* QUOTE TEXT */}
            <p className="testimonial-quote-text">{item.quote}</p>

            {/* AUTHOR DETAILS */}
            <div className="testimonial-author-block">
                <h4 className="testimonial-author-name">{item.name}</h4>
                <p className="testimonial-author-role">
                    {item.role.split("\n").map((line, idx) => (
                        <React.Fragment key={idx}>
                            {line}
                            {idx < item.role.split("\n").length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </p>
            </div>
        </div>
    );
};

/* =========================================================
   MAIN TESTIMONIALS COMPONENT
   ========================================================= */

export default function Testimonials({ isLeft }) {
    const items = isLeft ? testimonialsLeft : testimonialsRight;

    return (
        <>
        <style>{testimonialResponsiveStyle}</style>
        <div className={`testimonials-page-container ${isLeft ? "testimonials-page-left" : "testimonials-page-right"}`}>
            {/* CONTINUOUS HEADER WITH GOLD LINE (MATCHING PORTFOLIO) */}
            {isLeft ? (
                <div className="testimonials-header-left">
                    <h2 className="testimonials-title">Testimonials</h2>
                    <div className="testimonials-gold-line" />
                </div>
            ) : (
                <div className="testimonials-header-right">
                    <div className="testimonials-gold-line" />
                </div>
            )}

            {/* 2 COLUMNS x 2 ROWS GRID */}
            <div className="testimonials-grid">
                {/* ROW 1 */}
                <div className="testimonials-grid-row">
                    <TestimonialCard item={items[0]} showRightBorder={true} />
                    <TestimonialCard item={items[1]} showRightBorder={false} />
                </div>

                {/* ROW 2 */}
                <div className="testimonials-grid-row">
                    <TestimonialCard item={items[2]} showRightBorder={true} />
                    <TestimonialCard item={items[3]} showRightBorder={false} />
                </div>
            </div>
        </div>
        </>
    );
}
