import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";

// ============================================================
// PORTFOLIO BOOK COVER IMAGES
// ============================================================

// ------------------------------------------------------------
// PAGE 1
// ------------------------------------------------------------

import img01 from "../../assets/Page 1/01.jpg";
import img02 from "../../assets/Page 1/02.jpg";
import img03 from "../../assets/Page 1/03.jpg";
import img04 from "../../assets/Page 1/04.jpg";
import img05 from "../../assets/Page 1/05.jpg";
import img06 from "../../assets/Page 1/06.jpg";
import img07 from "../../assets/Page 1/07.jpg";
import img08 from "../../assets/Page 1/08.jpg";
import img09 from "../../assets/Page 1/09.jpg";

// ------------------------------------------------------------
// PAGE 2
// ------------------------------------------------------------

import img10 from "../../assets/Page 2/01.jpg";
import img11 from "../../assets/Page 2/02.jpg";
import img12 from "../../assets/Page 2/03.jpg";
import img13 from "../../assets/Page 2/04.jpg";
import img14 from "../../assets/Page 2/05.jpg";
import img15 from "../../assets/Page 2/06.jpg";
import img16 from "../../assets/Page 2/07.jpg";
import img17 from "../../assets/Page 2/08.jpg";
import img18 from "../../assets/Page 2/09.jpg";

// ------------------------------------------------------------
// PAGE 3
// ------------------------------------------------------------

import img19 from "../../assets/Page 3/01.jpg";
import img20 from "../../assets/Page 3/02.jpg";
import img21 from "../../assets/Page 3/03.jpg";
import img22 from "../../assets/Page 3/04.jpg";
import img23 from "../../assets/Page 3/05.jpg";
import img24 from "../../assets/Page 3/06.jpg";
import img25 from "../../assets/Page 3/07.jpg";
import img26 from "../../assets/Page 3/08.jpg";
import img27 from "../../assets/Page 3/09.jpg";

// ------------------------------------------------------------
// PAGE 4
// ------------------------------------------------------------

import img28 from "../../assets/Page 4/01.jpg";
import img29 from "../../assets/Page 4/02.jpg";
import img30 from "../../assets/Page 4/03.jpg";
import img31 from "../../assets/Page 4/04.jpg";
import img32 from "../../assets/Page 4/05.jpg";
import img33 from "../../assets/Page 4/06.jpg";
import img34 from "../../assets/Page 4/07.jpg";
import img35 from "../../assets/Page 4/08.jpg";
import img36 from "../../assets/Page 4/09.jpg";

// ============================================================
// BOOK DATA
// ============================================================

const bookData = [
  {
    image: img01,
    author: "Sarah Mitchell",
    link: "https://example.com/book1",
  },
  {
    image: img02,
    author: "James Anderson",
    link: "https://example.com/book2",
  },
  {
    image: img03,
    author: "Emily Parker",
    link: "https://example.com/book3",
  },
  {
    image: img04,
    author: "Michael Roberts",
    link: "https://example.com/book4",
  },
  {
    image: img05,
    author: "Jessica Chen",
    link: "https://example.com/book5",
  },
  {
    image: img06,
    author: "David Williams",
    link: "https://example.com/book6",
  },
  {
    image: img07,
    author: "Laura Martinez",
    link: "https://example.com/book7",
  },
  {
    image: img08,
    author: "Robert Thompson",
    link: "https://example.com/book8",
  },
  {
    image: img09,
    author: "Amanda White",
    link: "https://example.com/book9",
  },
  {
    image: img10,
    author: "Daniel Garcia",
    link: "https://example.com/book10",
  },
  {
    image: img11,
    author: "Michelle Lee",
    link: "https://example.com/book11",
  },
  {
    image: img12,
    author: "Christopher Brown",
    link: "https://example.com/book12",
  },
  {
    image: img13,
    author: "Stephanie Davis",
    link: "https://example.com/book13",
  },
  {
    image: img14,
    author: "Matthew Wilson",
    link: "https://example.com/book14",
  },
  {
    image: img15,
    author: "Rachel Kim",
    link: "https://example.com/book15",
  },
  {
    image: img16,
    author: "Kevin Taylor",
    link: "https://example.com/book16",
  },
  {
    image: img17,
    author: "Nicole Johnson",
    link: "https://example.com/book17",
  },
  {
    image: img18,
    author: "Brian Anderson",
    link: "https://example.com/book18",
  },
  {
    image: img19,
    author: "Jennifer Park",
    link: "https://example.com/book19",
  },
  {
    image: img20,
    author: "Thomas Lee",
    link: "https://example.com/book20",
  },
  {
    image: img21,
    author: "Lisa Wong",
    link: "https://example.com/book21",
  },
  {
    image: img22,
    author: "Paul Harris",
    link: "https://example.com/book22",
  },
  {
    image: img23,
    author: "Karen Martin",
    link: "https://example.com/book23",
  },
  {
    image: img24,
    author: "Andrew Thompson",
    link: "https://example.com/book24",
  },
  {
    image: img25,
    author: "Patricia White",
    link: "https://example.com/book25",
  },
  {
    image: img26,
    author: "Steven Davis",
    link: "https://example.com/book26",
  },
  {
    image: img27,
    author: "Catherine Miller",
    link: "https://example.com/book27",
  },
  {
    image: img28,
    author: "Edward Johnson",
    link: "https://example.com/book28",
  },
  {
    image: img29,
    author: "Margaret Brown",
    link: "https://example.com/book29",
  },
  {
    image: img30,
    author: "Anthony Williams",
    link: "https://example.com/book30",
  },
  {
    image: img31,
    author: "Dorothy Smith",
    link: "https://example.com/book31",
  },
  {
    image: img32,
    author: "Joseph Jones",
    link: "https://example.com/book32",
  },
  {
    image: img33,
    author: "Martha Garcia",
    link: "https://example.com/book33",
  },
  {
    image: img34,
    author: "Charles Rodriguez",
    link: "https://example.com/book34",
  },
  {
    image: img35,
    author: "Susan Martinez",
    link: "https://example.com/book35",
  },
  {
    image: img36,
    author: "William Jackson",
    link: "https://example.com/book36",
  },
];

// ============================================================
// PORTFOLIO SPREADS
// ============================================================

const firstSpreadLeft = [
  img01,
  img02,
  img03,
  img04,
  img05,
  img06,
  img07,
  img08,
  img09,
];

const firstSpreadRight = [
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
];

const secondSpreadLeft = [
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
  img27,
];

const secondSpreadRight = [
  img28,
  img29,
  img30,
  img31,
  img32,
  img33,
  img34,
  img35,
  img36,
];

const thirdSpreadLeft = [];
const thirdSpreadRight = [];

// ============================================================
// GET BOOK INFORMATION
// ============================================================

const getBookDataByImage = (image) => {
  return (
    bookData.find((book) => book.image === image) || {
      author: "Unknown Author",
      link: "#",
    }
  );
};

// ============================================================
// BOOK MODAL - SIMPLIFIED COVER-ONLY VERSION
// ============================================================

const BookModal = ({
  selectedImage,
  onClose,
  onPrev,
  onNext,
}) => {
  // ==========================================================
  // LOCK BODY SCROLL
  // ==========================================================

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // ==========================================================
  // ESCAPE KEY
  // ==========================================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/30
        px-3
        py-4
        backdrop-blur-[8px]
        sm:px-4
        sm:py-5
        md:backdrop-blur-[10px]
      "
      onClick={onClose}
    >
      {/* ======================================================
          MODAL - CENTERED COVER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          max-h-[90vh]
          max-w-[90vw]
          items-center
          justify-center
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* ====================================================
            CLOSE BUTTON - OUTSIDE TOP RIGHT (BLACK ICON ONLY)
        ==================================================== */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="
            absolute
            -right-8
            -top-8
            z-20
            text-black
            transition-all
            duration-200
            hover:text-[#c8a951]
          "
        >
          <FaTimes size={22} />
        </button>

        {/* ====================================================
            BOOK IMAGE
        ==================================================== */}

        <div className="relative flex max-h-[75vh] max-w-full items-center justify-center">
          {/* BOOK SHADOW */}
          <div
            className="
              absolute
              bottom-[-10px]
              left-1/2
              h-5
              w-[60%]
              -translate-x-1/2
              rounded-full
              bg-black/15
              blur-md
            "
          />

          <img
            src={selectedImage}
            alt="Book cover"
            draggable="false"
            className="
              relative
              z-10
              block
              max-h-[70vh]
              max-w-[70vw]
              rounded-[2px]
              object-contain
              shadow-[8px_14px_30px_rgba(0,0,0,0.25)]
            "
          />
        </div>

        {/* ====================================================
            NAVIGATION ARROWS - BELOW BOOK COVER (BLACK ICONS ONLY)
        ==================================================== */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
          aria-label="Previous book"
          className="
            absolute
            -bottom-12
            left-1/2
            z-20
            -translate-x-14
            text-black
            transition-all
            duration-200
            hover:text-[#c8a951]
          "
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          aria-label="Next book"
          className="
            absolute
            -bottom-12
            left-1/2
            z-20
            translate-x-14
            text-black
            transition-all
            duration-200
            hover:text-[#c8a951]
          "
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>,
    document.body
  );
};

// ============================================================
// PORTFOLIO COMPONENT
// ============================================================

export default function Portfolio({
  isLeft,
  spread = 1,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ==========================================================
  // SELECT CURRENT SPREAD
  // ==========================================================

  let images = [];

  if (spread === 1) {
    images = isLeft
      ? firstSpreadLeft
      : firstSpreadRight;
  }

  if (spread === 2) {
    images = isLeft
      ? secondSpreadLeft
      : secondSpreadRight;
  }

  if (spread === 3) {
    images = isLeft
      ? thirdSpreadLeft
      : thirdSpreadRight;
  }

  // ==========================================================
  // ALL PORTFOLIO IMAGES
  // ==========================================================

  const allImages = [
    ...firstSpreadLeft,
    ...firstSpreadRight,
    ...secondSpreadLeft,
    ...secondSpreadRight,
    ...thirdSpreadLeft,
    ...thirdSpreadRight,
  ];

  // ==========================================================
  // OPEN MODAL
  // ==========================================================

  const handleImageClick = (event, image) => {
    event.stopPropagation();

    if (event.nativeEvent?.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation();
    }

    const index = allImages.findIndex(
      (item) => item === image
    );

    setCurrentIndex(index >= 0 ? index : 0);
    setSelectedImage(image);
  };

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // ==========================================================
  // PREVIOUS
  // ==========================================================

  const handlePrev = () => {
    if (!allImages.length) return;

    const newIndex =
      currentIndex > 0
        ? currentIndex - 1
        : allImages.length - 1;

    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  // ==========================================================
  // NEXT
  // ==========================================================

  const handleNext = () => {
    if (!allImages.length) return;

    const newIndex =
      currentIndex < allImages.length - 1
        ? currentIndex + 1
        : 0;

    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  // ==========================================================
  // GET PAGE NUMBER
  // ==========================================================

  const getPageNumber = () => {
    // Right side pages only (when isLeft is false)
    if (!isLeft) {
      if (spread === 1) return "01";
      if (spread === 2) return "02";
      if (spread === 3) return "03";
    }
    return "";
  };

  // ==========================================================
  // PORTFOLIO PAGE
  // ==========================================================

  return (
    <>
      <div
        className={`
          relative
          flex
          h-full
          w-full
          flex-col
          overflow-hidden
          bg-transparent
          pt-4
          sm:pt-5
          ${isLeft
            ? "pr-4 sm:pr-5"
            : "pl-4 sm:pl-5"
          }
        `}
      >
        {/* ====================================================
            PAGE NUMBER - TOP RIGHT CORNER (Only on right pages)
        ==================================================== */}

        {!isLeft && (
          <div
            className="
              absolute
              right-3
              top-[7px]
              z-20
              text-[20px]
              font-normal
              tracking-[0.5px]
              text-[#211912]
              sm:right-5
              sm:top-[7px]
            "
            style={{ fontFamily: '"Helvetica Light"' }}
          >
            {getPageNumber()}
          </div>
        )}

        {/* ====================================================
            PAGE CONTENT
        ==================================================== */}

        <div className="relative z-10 flex h-full min-h-0 flex-col">
          {/* ==================================================
              HEADER
          ================================================== */}

          {isLeft ? (
            <div
              className="
                flex
                h-[55px]
                flex-shrink-0
                items-start
                justify-between
                pb-1
                pr-2
              "
            >
              <div className="relative top-[7px]">
                <h2
                  className="
                    text-[20px]
                    font-normal
                    leading-none
                    tracking-[0.5px]
                    text-[#211912]
                    sm:text-[20px]
                  "
                  style={{ fontFamily: '"Helvetica Light", ' }}
                >
                  portfolio
                </h2>

                <div
                  className="
                    mt-2
                    mb-[14px]
                    h-[2px]
                    w-10
                    bg-[#c8a951]
                  "
                />
              </div>
            </div>
          ) : (
            <div
              className="
                h-[55px]
                flex-shrink-0
              "
            />
          )}

          {/* ==================================================
              BOOK COVERS GRID
          ================================================== */}

          <div
            className="
              grid
              min-h-0
              flex-1
              grid-cols-3
              grid-rows-3
              gap-x-2
              gap-y-2
              px-1
              pb-1
              pt-0
              sm:gap-x-3
              sm:gap-y-3
              sm:px-2
              sm:pb-2
              sm:pt-0
            "
          >
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={(event) => {
                  handleImageClick(event, image);
                }}
                className="
                  group
                  relative
                  flex
                  h-full
                  w-full
                  flex-col
                  items-stretch
                  justify-stretch
                  border-0
                  bg-transparent
                  p-0
                  outline-none
                  focus:outline-none
                "
              >
                {/* ===============================================
                    FIXED BOOK HEIGHT CONTAINER
                =============================================== */}

                <div
                  className="
                    relative
                    w-full
                    overflow-hidden
                    transition-all
                    duration-300
                    ease-out
                    group-hover:-translate-y-[2px]
                  "
                  style={{ aspectRatio: "2 / 3" }}
                >
                  {/* BOOK IMAGE */}

                  <img
                    src={image}
                    alt="Portfolio book cover"
                    draggable="false"
                    className="
                      absolute
                      inset-0
                      block
                      h-full
                      w-full
                      select-none
                      object-fill
                      shadow-[3px_4px_7px_rgba(0,0,0,0.22)]
                      transition-all
                      duration-300
                      group-hover:shadow-[5px_8px_13px_rgba(0,0,0,0.26)]
                    "
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================
          MODAL
      ====================================================== */}

      {selectedImage && (
        <BookModal
          selectedImage={selectedImage}
          currentIndex={currentIndex}
          allImages={allImages}
          onClose={handleCloseModal}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
}