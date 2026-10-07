import React, { useLayoutEffect, useRef, useState } from "react";
import layer1 from "../../assets/images/Layer1.png";
import layer2 from "../../assets/images/Layer2.png";
import layer3 from "../../assets/images/Layer3.png";
import layer4 from "../../assets/images/Layer4.png";
import layer5 from "../../assets/images/Layer5.png";
import layer6 from "../../assets/images/Layer6.png";
import layer7 from "../../assets/images/Layer7.png";
import layer8 from "../../assets/images/Layer8.png";
import "./Testimonials.css";

/* Reference page width (design px) the CSS is authored at */
const DESIGN_W = 370;
/* Smallest design height that still fits all four testimonials */
const MIN_DESIGN_H = 480;
/* Text-size factor range tried by the best-fit search (1 = reference size) */
const MAX_TF = 1.9;
const MIN_TF = 0.8;
const TF_STEP = 0.04;

/* =========================================================
   TESTIMONIALS DATA
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
   SINGLE TESTIMONIAL CARD
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
                    {item.role.split("\n").map((line, idx, arr) => (
                        <React.Fragment key={idx}>
                            {line}
                            {idx < arr.length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </p>
            </div>
        </div>
    );
};

/* =========================================================
   MAIN TESTIMONIALS COMPONENT
   - measures the book page (layout size, unaffected by flip transforms)
   - sizes the artboard to exactly fill it, scaled by page width
   - finds the largest text size at which every card still fits
   ========================================================= */

export default function Testimonials({ isLeft }) {
    const items = isLeft ? testimonialsLeft : testimonialsRight;

    const wrapRef = useRef(null);
    const artRef = useRef(null);
    const [dims, setDims] = useState(null); // { s, w, h } in design px
    const [tf, setTf] = useState(null); // text-size factor; null = not decided yet

    /* 1) measure the page */
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

    /* 2) best-fit text size for the current page size */
    useLayoutEffect(() => {
        const art = artRef.current;
        if (!art || !dims) return;

        const cards = Array.from(art.querySelectorAll(".testimonial-card"));
        const fits = () =>
            cards.every(
                (c) =>
                    c.scrollHeight <= c.clientHeight + 1 &&
                    c.scrollWidth <= c.clientWidth + 1
            );

        let best = MIN_TF;
        for (let f = MAX_TF; f >= MIN_TF - 1e-6; f -= TF_STEP) {
            art.style.setProperty("--tf", f.toFixed(3));
            if (fits()) {
                best = f;
                break;
            }
        }
        art.style.setProperty("--tf", best.toFixed(3));
        setTf(best);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dims && dims.w, dims && dims.h, isLeft]);

    const ready = dims !== null && tf !== null;

    return (
        <div
            ref={wrapRef}
            className={`testimonials-page-container ${
                isLeft ? "testimonials-page-left" : "testimonials-page-right"
            }`}
        >
            <div
                ref={artRef}
                className="testimonials-artboard"
                style={
                    dims
                        ? {
                              "--s": dims.s,
                              "--tf": tf === null ? 1 : tf,
                              width: dims.w,
                              height: dims.h,
                              visibility: ready ? "visible" : "hidden",
                          }
                        : {
                              width: DESIGN_W,
                              height: MIN_DESIGN_H,
                              visibility: "hidden",
                          }
                }
            >
                {/* CONTINUOUS HEADER WITH GOLD LINE */}
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
                    <div className="testimonials-grid-row">
                        <TestimonialCard item={items[0]} showRightBorder={true} />
                        <TestimonialCard item={items[1]} showRightBorder={false} />
                    </div>

                    <div className="testimonials-grid-row">
                        <TestimonialCard item={items[2]} showRightBorder={true} />
                        <TestimonialCard item={items[3]} showRightBorder={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}