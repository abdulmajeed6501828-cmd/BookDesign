import React from "react";
import coverImg from "../../assets/cover.jpeg";
import logoImg from "../../assets/AAFI-Logo.png";
import "./BookCover.css";

const BookCover = React.forwardRef(({ onClick, width, height }, ref) => {
    return (
        <div
            ref={ref}
            className="book-cover closed-book"
            onClick={onClick}
            style={width && height ? { width: `${width}px`, height: `${height}px` } : undefined}
        >
            {/* Background book texture image */}
            <img src={coverImg} alt="Cover texture" className="book-cover-bg" />

            {/* Left spine shadow */}
            <div className="bc-spine-shadow" />

            {/* Top right code marker */}
            

            {/* Front Cover Content Overlay */}
            <div className="aafi-cover-overlay">
                {/* Gold DA Logo emblem & Brand Name */}
                <div className="aafi-logo-wrapper">
                    <img src={logoImg} alt="DA Monogram" className="aafi-logo-symbol" />
                    <h2 className="aafi-brand-title">AAFI DESIGNS</h2>
                </div>

                {/* Subtitle text */}
                <div className="aafi-subtitle-wrapper">
                    <p>HELPING AUTHORS</p>
                    <p>LOOK PROFESSIONAL AND</p>
                    <p>PUBLISH CONFIDENTLY</p>
                </div>

                 
            </div>
        </div>
    );
});

export default BookCover;
