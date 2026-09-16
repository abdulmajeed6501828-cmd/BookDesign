import React from "react";

const BookPage = React.forwardRef((props, ref) => {
    const sideClass = props.isLeft ? "left-page" : "right-page";
    // Show a 1-based page number offset from the cover (index 0)
    const displayNumber = props.number;

    return (
        <div className={`book-page ${sideClass}`} ref={ref} data-density="soft">
            <div className="page-inner">
                {/* Main content area */}
                <div className="page-content">
                    {props.children}
                </div>
            </div>
        </div>
    );
});

export default BookPage;
